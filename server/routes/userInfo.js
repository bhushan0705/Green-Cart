const express = require('express');
const User = require('../models/User'); // user model
const router = express.Router();

// 👤 Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error during signup" });
  }
});

// 🔐 Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.password !== password) return res.status(400).json({ error: "Wrong password" });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error during login" });
  }
});


module.exports = router;