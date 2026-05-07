import argparse
import json
import logging
import os
import re
import sys
from pathlib import Path
from typing import List, Dict, Any
from colorama import init, Fore, Style

init(autoreset=True)

# Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Regex patterns sources:
# - AWS: AWS Acceess Key Id, AWS Secret Access Key
# - GitHub: GhtHub PATs (Personal Access Tokens)
# - Stripe: Stripe API Keys
# - Google: Google API Keys
# - Generic high-entropy tokens/passwords with context (e.g. "password=...", "api
# - Private Keys: PEM blocks for RSA, OpenSSH, EC, DSA, PGP
# - JWT Tokens: JSON Web Tokens
# - Slack Tokens: Slack Bot/User Tokens
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

# Skip filenames and types that probably won't have secrets
SKIP_EXTENSION_TYPES = {'.png', '.jpg', '.jpeg', '.gif', '.pdf', '.zip', '.exe', '.bin'}
SKIP_FILENAMES = {'node_modules', '.git', 'venv', 'env', '__pycache__'}

# Function to determine if a file or directory should be skipped
def shouldSkip(path: Path) -> bool:
    if path.is_dir() and any(skip in path.name for skip in SKIP_FILENAMES):
        return True
    if path.suffix.lower() in SKIP_EXTENSION_TYPES:
        return True
    return False

# Scan a single file for secrets
def fileScanner(filePath: Path) -> List[Dict[str, Any]]:
    findings = []
    try:
        print(f"Scanning file: {filePath}")  # ← Added for debugging
        
        with open(filePath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            lines = content.splitlines()
            
            for line_num, line in enumerate(lines, 1):
                for pattern, name in PATTERNS:
                    for match in pattern.finditer(line):
                        secret = match.group(0)
                        masked = secret[:8] + '...' + secret[-4:] if len(secret) > 12 else secret
                        findings.append({
                            'file': str(filePath),
                            'line': line_num,
                            'pattern': name,
                            'matched': masked,
                            'full_match': secret[:200]
                        })
    except Exception as e:
        logging.error(f"Could not read {filePath}: {e}")
        print(f"Error reading file: {e}")
    
    return findings

# Scan a directory for secrets
def directoryScanner(dirPath: Path) -> List[Dict[str, Any]]:
    all_findings = []
    for root, dirs, files in os.walk(dirPath):
        dirs[:] = [d for d in dirs if not shouldSkip(Path(root) / d)]
        
        for file in files:
            file_path = Path(root) / file
            if shouldSkip(file_path):
                continue
            logging.info(f"Scanning {file_path}")
            findings = fileScanner(file_path)
            all_findings.extend(findings)
    return all_findings

# Main function to parse arguments and run the scanner
def main():
    # -- CLI Argument Parsing --
    parser = argparse.ArgumentParser(description="SDEV 245 - Module 8 - Secret Scanner")
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
        print(f"→ Scanning single file: {target}")
        findings = fileScanner(target)
    else:
        print(f"→ Scanning directory: {target}")
        findings = directoryScanner(target)
    
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