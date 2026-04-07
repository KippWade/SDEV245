/**
 * Encrypts a string using the Caesar cipher.
 * @param {string} text - The text to encrypt.
 * @param {number} shift - The number of positions to shift each letter.
 * @returns {string} - The encrypted text.
 */
function caesarEncrypt(text, shift = 3) {
  return text.replace(/[a-zA-Z]/g, char => {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
  });
}

/**
 * Decrypts a string using the Caesar cipher.
 * @param {string} text - The text to decrypt.
 * @param {number} shift - The number of positions to shift each letter.
 * @returns {string} - The decrypted text.
 */
function caesarDecrypt(text, shift = 3) {
  return caesarEncrypt(text, 26 - shift);
}

// demo
console.log("=== Caesar Cipher Demo ===\n");

const message = "Hello Module 3!";
const encrypted = caesarEncrypt(message, 5);
const decrypted = caesarDecrypt(encrypted, 5);

console.log("Original :", message);
console.log("Encrypted:", encrypted);
console.log("Decrypted:", decrypted);
