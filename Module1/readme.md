# SDEV 245 - Module 1
## March 23, 2026 - Kipp Shinabarger
## Simple RBAC Demo in Node.js

Basic Node.js script to demonstrate **Authentication** and **Role-Based Access Control (RBAC)**.

## Requirements:
1. Login simulation
 - Use a hardcoded username and role in the script.
 - No need for password hashing or form input.
2. User roles
 - Create two user roles (e.g., admin and user) using simple logic or a dictionary.
3. Protected actions or routes
 - Simulate two different functions or endpoints.
 - Allow only admin to access one, and only user to access the other.
4. Code comment or short paragraph
 - Explain in a few lines how your app shows one part of the CIA triad (Confidentiality, Integrity, or Availability).

## How it shows Authentication vs Access Control (Authorization)
- **Authentication** = Login (verify who you are)
- **Authorization / Access Control** = Role check (deciding *what* you are allowed to do)

## CIA Triad
This application primarily demonstrates **Confidentiality** from the CIA triad.

We use role-based access control, this prevents unauthorized users from viewing sensitive information. This protects data from unauthorized access, which is the core of Confidentiality.

## How to Run
```bash
node app.js