const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Verify user ID
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// User routes
router.get('/verify/:username', auth, async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ 
        isValid: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      isValid: true,
      message: 'User is valid'
    });
  } catch (error) {
    res.status(500).json({
      isValid: false,
      message: 'Server error'
    });
  }
});

module.exports = router;