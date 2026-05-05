# Secret Scanner CLI

A simple, fast Python tool to detect hardcoded secrets in code.

## Detection Logic
- **Regex-based**: Uses curated patterns for high-confidence matches (AWS, GitHub, Stripe, JWT, private keys, generic tokens, etc.).
- Sources inspired by Gitleaks, GitHub secret scanning, and public regex databases.
- Context-aware where possible (keywords near values).
- Skips binaries, large/irrelevant dirs.

## Usage
See above.

## Extending Patterns
Edit the `PATTERNS` list in `secret_scanner.py`. Add more from [secrets-patterns-db](https://github.com/mazen160/secrets-patterns-db) or Gitleaks configs.

## Limitations & Improvements
- False positives possible (especially generic pattern).
- No validation against live APIs.
- Future: Add entropy scoring, ignore lists, Git integration.

