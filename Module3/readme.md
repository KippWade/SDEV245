# Module 3 Assignment  
**User Authentication with Role-Based Access Control + Cryptography**

## Project Description
This Node.js application demonstrates secure user login, role-based access control (RBAC), and core cryptographic concepts as required by the assignment.

## Learning Outcomes Addressed

### 3.1 Describe how randomness affects cryptographic algorithm strength
**Key Concept: Entropy**

- True randomness (high entropy) is critical for cryptographic security.  
- Without sufficient entropy, even strong algorithms become weak because keys become predictable.  
- This project uses cryptographically secure random number generation for:
  - Password salting with **bcrypt**
  - RSA key pair generation
  - JWT token signing

**Resources Studied:**
- [True Randomness Can’t be Left to Chance: Why entropy is important for information security](https://www.link-provided-in-canvas.com)
- [Entropy (computing)](https://www.link-provided-in-canvas.com)
- [Random numbers](https://www.link-provided-in-canvas.com)
- YouTube: [How secure is 256 bit security?](https://youtu.be/... ) [5:05]

### 4.1 Encrypt a message using a simple substitution cipher
- Implemented **Caesar Cipher** (classic substitution cipher)

### 4.2 Implement a SHA-256 hash to verify file integrity
- SHA-256 hashing for both text and uploaded files

### 4.3 Illustrate the process of digital signatures using private/public key pairs
- RSA-based digital signature generation and verification

**Supporting Resources:**
- [Digital signatures: What they are & how they work](https://www.link-provided-in-canvas.com)
- [Understanding Digital Signatures](https://www.link-provided-in-canvas.com)
- [What is SHA-256?](https://www.link-provided-in-canvas.com)
- [What is the SHA-256 algorithm, and how does it work?](https://www.link-provided-in-canvas.com)
- [Common encryption types explained](https://www.link-provided-in-canvas.com)
- [Types of Encryption Algorithms + Pros and Cons](https://www.link-provided-in-canvas.com)

