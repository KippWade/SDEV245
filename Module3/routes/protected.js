const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { caesarEncrypt, caesarDecrypt } = require('../crypto/caesar');
const { hashFile, verifyFileIntegrity } = require('../crypto/hash');
const { signData, verifySignature, generateKeys } = require('../crypto/signature');

const router = express.Router();

// === Crypto Routes ===
router.post('/caesar', authenticate, (req, res) => {
  const { message, shift = 3, action } = req.body;
  const result = action === 'encrypt' 
    ? caesarEncrypt(message, parseInt(shift))
    : caesarDecrypt(message, parseInt(shift));
  res.json({ result });
});

router.post('/hash', authenticate, (req, res) => {
  const { text } = req.body;
  const hash = require('crypto').createHash('sha256').update(text).digest('hex');
  res.json({ sha256: hash });
});

router.post('/sign', authenticate, (req, res) => {
  const { data } = req.body;
  const { privateKey, publicKey } = generateKeys();
  const signature = signData(data, privateKey);
  res.json({ signature, publicKey });
});

router.post('/verify', authenticate, (req, res) => {
  const { data, signature, publicKey } = req.body;
  const isValid = verifySignature(data, signature, publicKey);
  res.json({ valid: isValid });
});

// === Role-based Protected Routes ===
router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: '🔐 Welcome Admin! Full access granted.' });
});

router.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Hello ${req.user.role} user`, user: req.user });
});

module.exports = router;