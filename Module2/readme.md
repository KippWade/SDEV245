## SDEV 245 - Module 2
### March 30, 2026 - Kipp Shinabarger
### Encryption Demo - Symmetric & Asymmetric in Node.js

---

## Project Overview
This project demonstrates encryption and decryption of a short message using both **symmetric** and **asymmetric** cryptographic methods in Node.js.

- **Symmetric Encryption**: AES-256-GCM (fast, uses the same key for encryption and decryption)
- **Asymmetric Encryption**: RSA-2048 with OAEP padding (public key for encryption, private key for decryption)

## Assignment Requirements
1. Encrypt/decrypt a short message using symmetric and asymmetric methods.
2. Display keys used, inputs, and outputs (saved in `output.txt`).
3. Include a README explaining the code’s functionality.

## Features
- Uses Node.js built-in `crypto` module (no external dependencies).
- Generates fresh keys each run.
- Saves all keys, encrypted data, and results to `output.txt` for easy submission.
- Clear console output for demonstration.

## Project Structure
SDEV245/Module2/  
├── app.js              # Main encryption script  
├── README.md  
├── output.txt          # Generated: keys, inputs, and outputs  
└── .gitignore  

## How to Run
```bash
node app.js
