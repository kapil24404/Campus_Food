const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.key;

const generateToken = (user) => {
  const payload = {
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
