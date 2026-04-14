# Secure Hash & Encrypt Tool

A simple Node.js CLI to demonstrate secure handling of user input through hashing and symmetric encryption.

## Features
- Accepts user message via CLI
- Computes SHA-256 hash for integrity
- Encrypts using AES-256-GCM (authenticated encryption)
- Decrypts and verifies integrity by comparing hashes

## How it Upholds CIA Triad

**Confidentiality**:  
The original message is encrypted with AES-256-GCM using a 256-bit random key. Only someone with the exact key can decrypt it. AES-GCM is a strong, modern symmetric cipher recommended for most applications.

**Integrity**:  
- A separate SHA-256 hash of the plain text is generated before encryption and stored with the ciphertext.
- After decryption, the hash is regenerated and compared. Any tampering (even a single bit) will cause a mismatch.
- Additionally, AES-GCM provides built-in integrity via the authentication tag, which prevents decryption of modified ciphertexts.

**Availability**:  
The process is fast, uses only built-in Node.js `crypto` module (no external dependencies), and runs locally. It does not rely on network services, so the tool remains available offline. Proper error handling ensures the script doesn't crash on invalid input.

## Role of Entropy and Key Generation

Entropy refers to the randomness/unpredictability of data. High entropy is crucial for cryptographic keys — low-entropy keys (e.g., "password123") are vulnerable to brute-force or dictionary attacks.

In this implementation:
- The key is generated with `crypto.randomBytes(32)` — this uses CSPRNG (cryptographically secure pseudo-random number generators) provided by the operating system (e.g., `/dev/urandom` on Linux).
- 32 bytes = 256 bits provides extremely high entropy (2^256 possible keys — infeasible to brute-force).
- A new random Initialization Vector (IV) (12 bytes for GCM) is generated for every encryption. Reusing an IV with the same key would break security.

**Best Practice Note**:  
In production, never hard-code or log keys. Use secure key derivation (e.g., `crypto.scrypt` or `PBKDF2`) from a strong passphrase, or proper key management systems (KMS). Here we use `randomBytes` for simplicity and maximum entropy.

## Security Considerations
- This is for educational purposes. In real apps, handle keys securely (never commit them to git).
- AES-GCM is preferred over CBC because it provides authenticated encryption out of the box.
- Always validate and sanitize user input in larger applications.

Run with: `npm start`