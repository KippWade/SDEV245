## SDEV 245 - Module 5
### April 20, 2026 - Kipp Shinabarger
### OWASP Top 10 vulnerabilities

Each type will have it's secure code version presented in a folder of the same name.

## 1 Broken Access Control
(Samples 1 & 2)

Flaw: the endpoints allow any user to view another profile by simply changing the userId in the URL. There are no checks to enforce that the requester is accessing their own data.

Secured version:
    - adds authorization check to look at the requested id and the authenticated user id.
    - uses least privilege and "deny by default" methods
    - prevents unauthorized data access    

Referrence: https://owasp.org/Top10/2021/A01_2021-Broken_Access_Control/

## 2 Cryptographic Failures
(Samples 3 & 4)

FLaw: These samples use outdated hash algorithms that are vulnerable to collision attacks and other brute force attacks.

Secured version: 
    - uses bcrypt, an adaptive handing function designed for passwords
    - uses a strong radom salt
    - prevents offline cracking
    - prevents rainbow table attacks
    
Reference: https://owasp.org/Top10/2021/A02_2021-Cryptographic_Failures/

## 3 Injection
(Samples 5 & 6)

Flaw: User input is directly passed into queries without sanitization. This is vulernable to injection attacks.

Secured version:
    - uses input validation
    - uses escaping or parameterized queries

Reference: https://owasp.org/Top10/2021/A03_2021-Injection/

## 4 Insecure Design
(Sample 7)

Flaw: The password reset doesn't have verificaiton. This allows anyone with an email to reset an accounts password at any time.

Secured version:
    - adds toekn-based verification, password strength checks and notification

Reference: https://owasp.org/Top10/2021/A04_2021-Insecure_Design/    

## 5 Software and Data Integrity Failures
(Sample 8)

Flaw: This loads external scripts or librarires without integrity verification.

Secured version:
    - SRI (Subresource Integity) makes sure the external script is original and not tampered with by an attacker

Reference: https://owasp.org/Top10/2021/A08_2021-Software_and_Data_Integrity_Failures/

## 6 Server-Side Request Forgery
(Sample 9)

Flaw: The server is allowed to make any URL request made by the user. This allows attackers the ability to attack internal services.

Secured version:
    - implements strict `allowlist` of domains
    - validates scheme
    - has a timeout to prevent network access and SSRF attacks

Reference: https://owasp.org/Top10/2021/A10_2021-Server-Side_Request_Forgery_(SSRF)/

## 7 Identification and Authentiacation Failures
(Sample 10)

Flaw: Plain-text comparision of the password. Has no rate limit allowing unlimited attempts. 

Secured Version: 
    - uses bcrypt for secure password comparison
    - avoids storing or comparing plain-text passwords

Reference: https://owasp.org/Top10/2021/A07_2021-Identification_and_Authentication_Failures/
