const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userId = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ id: userId, name, email });
  } catch (err) {
    res.status(400).json({ message: 'User already exists' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await User.updateRefreshToken(user.id, refreshToken);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is required' });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const user = await User.findByRefreshToken(refreshToken);
    if (!user) {
      return res.status(403).json({ message: 'Refresh token not found' });
    }

    const accessToken = generateAccessToken(user.id);

    res.json({ accessToken });
  });
};

module.exports = { register, login, refreshToken };