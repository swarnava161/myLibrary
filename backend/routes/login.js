const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const router = express.Router();

// Generate a secret key
const yourSecretKey = crypto.randomBytes(32).toString('hex');

// Login route
router.post('/', async (req, res) => {
  // Extract user data from request body
  const { email, password, role } = req.body;

  try {
    // Check if user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the user is an admin
    const isAdmin = user.role === 'admin';

    // Generate and sign a JWT token using the secret key
    const token = jwt.sign({ userId: user._id, role: user.role }, yourSecretKey, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, isAdmin, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
