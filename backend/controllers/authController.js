const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, password, and role', data: null });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email already registered', data: null });
  }

  const user = await User.create({ name, email, password, role });
  const token = createToken(user._id);
  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: {
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
      token
    }
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required', data: null });
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password', data: null });
  }

  const token = createToken(user._id);
  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
      token
    }
  });
});

const getTeam = asyncHandler(async (req, res) => {
  const users = await User.find({}, 'name email role avatar createdAt');
  res.json({ success: true, message: 'Team members retrieved', data: users });
});

module.exports = { register, login, getTeam };
