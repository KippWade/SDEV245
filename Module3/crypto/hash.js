const crypto = require('crypto');
const fs = require('fs');

function hashFile(filePath) {
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(filePath));
  return hash.digest('hex');
}

function verifyFileIntegrity(filePath, expectedHash) {
  return hashFile(filePath) === expectedHash;
}

module.exports = { hashFile, verifyFileIntegrity };
