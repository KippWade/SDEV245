const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 14;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

async function verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}