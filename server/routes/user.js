const router = require('express').Router();
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');
const auth = require('../middleware/auth');

// Get user stats
router.get('/stat', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userProfile = await UserProfile.findOne({ user: req.userId });
    if (!userProfile) return res.status(404).json({ message: 'User profile not found' });

    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;