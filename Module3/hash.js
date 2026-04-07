const crypto = require('crypto');
const fs = require('fs');

/**
 * Hashes a string using SHA-256.
 * @param {string} text - The text to hash.
 * @returns {string} - The SHA-256 hash.
 */
function hashString(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}
    
/**
 * Hashes a file using SHA-256.
 * @param {string} filePath - The path to the file to hash.
 * @returns {string} - The SHA-256 hash.
 */
function hashFile(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

// demo
console.log("SHA-256 Hash Demo\n");

const text = "Hello Module 3 Assignment";
console.log("Text:", text);
console.log("SHA-256 Hash:", hashString(text), "\n");

const fileName = "testfile.txt";
fs.writeFileSync(fileName, "This is a test file for integrity check.");
console.log(`File "${fileName}" created.`);
console.log("File SHA-256 Hash:", hashFile(fileName));
