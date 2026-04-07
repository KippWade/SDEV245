const crypto = require('crypto');

// Generate keys (run once and save to files)
function generateKeys() {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });
}

function signData(data, privateKey) {
  return crypto.sign('sha256', Buffer.from(data), privateKey).toString('base64');
}

function verifySignature(data, signature, publicKey) {
  return crypto.verify('sha256', Buffer.from(data), publicKey, Buffer.from(signature, 'base64'));
}

module.exports = { generateKeys, signData, verifySignature };
