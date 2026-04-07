const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📂 Module3 Crypto + RBAC Application`);
});
