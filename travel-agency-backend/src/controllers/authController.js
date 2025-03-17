const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userId = await User.create({ name, email, password });
    res.status(201).json({ id: userId, name, email });
  } catch (err) {
    res.status(400).json({ message: 'User already exists' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', { email, password });

  try {
    const user = await User.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role, 
      });

      const refreshToken = generateRefreshToken({
        id: user.id,
        email: user.email,
        role: user.role, 
      });

      await User.updateRefreshToken(user.id, refreshToken);
      console.log('Login successful:', { user, accessToken, refreshToken });
      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user || user.refresh_token !== refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(400).json({ message: 'Invalid refresh token' });
  }
};

const logout = async (req, res) => {
  const { id } = req.user; 

  await User.clearRefreshToken(id);

  res.json({ message: 'Logged out successfully' });
};

module.exports = { register, login, refreshToken, logout };