const crypto = require('crypto');

/**
 * Generates a digital signature for a given string using RSA.
 * @returns {void}
 */
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

const data = "This is an important document for Module 3 assignment.";

/**
 * Creates a digital signature for the given data using the private key.
 * @param {string} data - The data to sign.
 * @returns {string} - The base64-encoded signature.
 */
const signature = crypto.sign('sha256', Buffer.from(data), privateKey);
const signatureBase64 = signature.toString('base64');

console.log("=== Digital Signature Demo ===\n");
console.log("Data:", data);
console.log("\nSignature (base64):");
console.log(signatureBase64);

/**
 * Verifies the digital signature using the public key.
 * @param {string} data - The original data that was signed.
 * @param {string} signatureBase64 - The base64-encoded signature to verify.
 * @returns {boolean} - True if the signature is valid, false otherwise.
 */
const isValid = crypto.verify('sha256', Buffer.from(data), publicKey, signature);

console.log("\nSignature Verification:", isValid ? "VALID!" : "INVALID!");
