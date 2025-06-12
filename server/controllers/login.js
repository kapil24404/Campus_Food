const { sign } = require('jsonwebtoken');
const Users = require('../models/initData/schema/Users');
const { generateToken } = require('../utils/jwt');

const loginUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signUpUser = async (req, res) => {
  const { email } = req.body;
  const user = {"email":email,"role":"user"}

  try {
    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { loginUser, signUpUser };
