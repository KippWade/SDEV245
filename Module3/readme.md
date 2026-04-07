# Module 3 Assignment - Authentication & Cryptography

## Project Overview
A Node.js Express application with user authentication, Role-Based Access Control (RBAC), and cryptographic features.

## Learning Outcomes Demonstrated

### 3.1 Describe how randomness affects cryptographic algorithm strength
- Explained in **Randomness & Security** section below.
- RSA key generation and bcrypt salting rely on strong randomness.

### 4.1 Encrypt a message using a simple substitution cipher
- **Caesar Cipher** implemented (`/protected/caesar`)

### 4.2 Implement a SHA-256 hash to verify file integrity
- Text hashing: `/protected/hash-text`
- **File upload + SHA-256 hashing**: `/protected/hash-file`

### 4.3 Illustrate the process of digital signatures using private/public key pairs
- RSA Digital Signature: `/protected/sign` and `/protected/verify`

## Features
- User Registration & Login (JWT)
- Role-Based Access Control (Admin / User)
- Caesar Cipher Encryption/Decryption
- SHA-256 Hashing (text + files)
- RSA Digital Signatures
- File Upload for integrity checking

## How to Run
```bash
npm install
node server.js