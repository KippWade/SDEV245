# Secret Scanner CLI

A simple, Python tool to detect hardcoded secrets in code.

## Detection Logic
- **Regex-based**: Uses patterns from regextokens repository for matches (AWS, GitHub, Stripe, JWT, private keys, generic tokens, etc.).
- Context-aware where possible (keywords near values).
- Ignores binaries, irrelevant dirs.

## Usage
# Help
python scanner.py --help

# Scan a directory
python scanner.py ../module8

# Scan a single file
python scanner.py test_file.py

# Scan and save JSON report
python scanner.py ../module8 --output findings.json

