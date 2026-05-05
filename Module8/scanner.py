import argparse
import json
import logging
import os
import re
import sys
from pathlib import Path
from typing import List, Dict, Any

try:
    from colorama import init, Fore, Style
    init(autoreset=True)
except ImportError:
    # Fallback if colorama is not installed
    class Fore:
        RED = ''
        YELLOW = ''
        GREEN = ''
    class Style:
        RESET_ALL = ''

# Logging setup
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Regex patterns (minimum 5+, based on common sources like Gitleaks, GitHub, etc.)
PATTERNS = [
    # AWS
    (re.compile(r'AKIA[0-9A-Z]{16}'), "AWS Access Key ID"),
    (re.compile(r'(?i)aws(.{0,20})?[\'\"][0-9a-zA-Z/+]{40}[\'\"]'), "AWS Secret Access Key"),
    
    # GitHub
    (re.compile(r'ghp_[0-9a-zA-Z]{36}'), "GitHub Personal Access Token"),
    (re.compile(r'github_pat_[A-Za-z0-9]{22}_[A-Za-z0-9]{59}'), "GitHub Fine-grained PAT"),
    
    # Stripe
    (re.compile(r'sk_live_[0-9a-zA-Z]{24}'), "Stripe Secret Key"),
    (re.compile(r'sk_test_[0-9a-zA-Z]{24}'), "Stripe Test Key"),
    
    # Google
    (re.compile(r'AIza[0-9A-Za-z\\-_]{35}'), "Google API Key"),
    
    # Generic high-entropy tokens / passwords (with context)
    (re.compile(r'(?i)(api|secret|key|token|password)[\s\w]*[=:]\s*[\'"]([A-Za-z0-9._~!-]{20,})[\'"]'), "Generic Secret/Token"),
    
    # Private Keys
    (re.compile(r'-----BEGIN (?:RSA|OPENSSH|EC|DSA|PGP) PRIVATE KEY-----'), "Private Key Block"),
    
    # JWT
    (re.compile(r'eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+'), "JWT Token"),
    
    # Slack
    (re.compile(r'xox[baprs]-([0-9a-zA-Z]{10,48})?'), "Slack Token"),
]

# File extensions/filenames to skip
SKIP_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.pdf', '.zip', '.exe', '.bin'}
SKIP_FILENAMES = {'node_modules', '.git', 'venv', 'env', '__pycache__'}

def should_skip(path: Path) -> bool:
    if path.is_dir() and any(skip in path.name for skip in SKIP_FILENAMES):
        return True
    if path.suffix.lower() in SKIP_EXTENSIONS:
        return True
    return False

def scan_file(file_path: Path) -> List[Dict[str, Any]]:
    findings = []
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            for line_num, line in enumerate(f, 1):
                for pattern, name in PATTERNS:
                    for match in pattern.finditer(line):
                        secret = match.group(0)
                        # Mask for output (show first/last few chars)
                        masked = secret[:8] + '...' + secret[-4:] if len(secret) > 12 else secret
                        findings.append({
                            'file': str(file_path),
                            'line': line_num,
                            'pattern': name,
                            'matched': masked,
                            'full_match': secret[:200]  # truncated
                        })
    except Exception as e:
        logging.warning(f"Could not read {file_path}: {e}")
    return findings

def scan_directory(dir_path: Path) -> List[Dict[str, Any]]:
    all_findings = []
    for root, dirs, files in os.walk(dir_path):
        # Prune directories in-place
        dirs[:] = [d for d in dirs if not should_skip(Path(root) / d)]
        
        for file in files:
            file_path = Path(root) / file
            if should_skip(file_path):
                continue
            logging.info(f"Scanning {file_path}")
            findings = scan_file(file_path)
            all_findings.extend(findings)
    return all_findings

def main():
    parser = argparse.ArgumentParser(description="Secret Scanner - Detect hardcoded secrets")
    parser.add_argument("path", help="File or directory path to scan")
    parser.add_argument("--output", "-o", help="Output JSON report file")
    parser.add_argument("--verbose", "-v", action="store_true", help="Verbose logging")
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    target = Path(args.path).resolve()
    if not target.exists():
        logging.error(f"Path does not exist: {target}")
        sys.exit(1)
    
    logging.info(f"Starting scan of {target}")
    
    if target.is_file():
        findings = scan_file(target)
    else:
        findings = scan_directory(target)
    
    if findings:
        print(f"\n{Fore.RED}Potential secrets found:{Style.RESET_ALL}\n")
        for f in findings:
            print(f"{Fore.YELLOW}{f['file']}:{f['line']}{Style.RESET_ALL} - {f['pattern']}")
            print(f"   Match: {f['matched']}\n")
        
        if args.output:
            with open(args.output, 'w') as f:
                json.dump(findings, f, indent=2)
            logging.info(f"Report saved to {args.output}")
    else:
        print(f"{Fore.GREEN}No secrets found!{Style.RESET_ALL}")
    
    logging.info("Scan completed.")

if __name__ == "__main__":
    main()