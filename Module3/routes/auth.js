const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'your-super-secret-key-123';

let users = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('admin123', 10), role: 'admin' },
  { id: 2, username: 'user', password: bcrypt.hashSync('user123', 10), role: 'user' }
];

router.post('/register', async (req, res) => {
  const { username, password, role = 'user' } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  users.push({ id: users.length + 1, username, password: hashedPassword, role });
  res.json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET, { expiresIn: '2h' });
  
  res.json({ 
    message: 'Login successful', 
    token,
    role: user.role 
  });
});

module.exports = router;