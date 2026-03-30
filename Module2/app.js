const crypto = require('crypto'); // Built-in Node.js module for cryptographic operations

// SETTINGS
const message = "Hello World, this is a secret message for the assignment!";

// SYMMETRIC (AES-256-GCM) 
console.log("=== SYMMETRIC ENCRYPTION (AES-256-GCM) ===\n");

const aesKey = crypto.randomBytes(32);           // 256-bit key
const ivGCM = crypto.randomBytes(12);            // 96-bit IV for GCM

const cipher = crypto.createCipheriv('aes-256-gcm', aesKey, ivGCM);
let encryptedMessage = cipher.update(message, 'utf8', 'hex');
encryptedMessage += cipher.final('hex');
const authorizationTag = cipher.getAuthTag().toString('hex');

console.log("AES Key (hex):", aesKey.toString('hex'));
console.log("IV (hex):", ivGCM.toString('hex'));
console.log("Encrypted (hex):", encryptedMessage);
console.log("Auth Tag (hex):", authorizationTag);

// Decrypt
const decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, ivGCM);
decipher.setAuthTag(Buffer.from(authorizationTag, 'hex'));
let decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8');
decryptedMessage += decipher.final('utf8');

console.log("Decrypted message:", decryptedMessage);
console.log("Symmetric success:", decryptedMessage === message, "\n");

// ASYMMETRIC (RSA) 
console.log("ASYMMETRIC ENCRYPTION (RSA-OAEP)\n");

// Generate RSA key pair (2048-bit)
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

const publicKeyPem = publicKey.export({ type: 'spki', format: 'pem' });
const privateKeyPem = privateKey.export({ type: 'pkcs8', format: 'pem' });

console.log("Public Key (PEM):\n", publicKeyPem);
console.log("Private Key (PEM):\n", privateKeyPem);

// Encrypt with Public Key
const encryptedRSA = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256',
  },
  Buffer.from(message, 'utf8')
).toString('base64');

console.log("RSA Encrypted (base64):", encryptedRSA);

// Decrypt with Private Key
const decryptedRSA = crypto.privateDecrypt(
  {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256',
  },
  Buffer.from(encryptedRSA, 'base64')
).toString('utf8');

console.log("RSA Decrypted:", decryptedRSA);
console.log("Asymmetric success:", decryptedRSA === message);

//  SAVE OUTPUT TO FILE
const fs = require('fs');

const output = `
ENCRYPTION DEMO OUTPUT
Date: ${new Date().toISOString()}

Message: ${message}

SYMMETRIC (AES-256-GCM)
AES Key (hex): ${aesKey.toString('hex')}
IV (hex): ${ivGCM.toString('hex')}
Encrypted (hex): ${encryptedMessage}
Auth Tag: ${authorizationTag}
Decrypted: ${decryptedMessage}

ASYMMETRIC (RSA-2048)
Public Key (PEM):
${publicKeyPem}
Private Key (PEM):
${privateKeyPem}
Encrypted (base64): ${encryptedRSA}
Decrypted: ${decryptedRSA}
`;

fs.writeFileSync('output.txt', output);
console.log("\nAll results saved to output.txt");