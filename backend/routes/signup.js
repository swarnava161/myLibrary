const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');


const router = express.Router();

router.get('/admin-exists', async (req, res) => {
  try {
    const adminCount = await User.countDocuments({ role: 'admin' });
    const adminExists = adminCount > 0;
    res.json({ exists: adminExists });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Signup route
router.post('/', async (req, res) => {
  // Extract user data from request body
  const { name, email, password, confirmPassword, role } = req.body;

  // Check if confirm password matches
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Check if password is provided
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if role is valid
    if (role !== 'admin' && role !== 'user') {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Check if the role is admin and if there is already an admin user
    if (role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount > 0) {
        return res.status(400).json({ message: 'Only one admin user is allowed' });
      }
    }

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
