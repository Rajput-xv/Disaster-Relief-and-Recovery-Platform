const router = require('express').Router();
const UserProfile = require('../models/UserProfile');

router.post('/award-points', async (req, res) => {
  try {
    const { userId, points, reason } = req.body;
    const userProfile = await UserProfile.findOneAndUpdate(
      { user: userId },
      { $inc: { points: points } },
      { new: true, upsert: true }
    );
    // Logic to check and update level based on points
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/award-badge', async (req, res) => {
  try {
    const { userId, badge } = req.body;
    const userProfile = await UserProfile.findOneAndUpdate(
      { user: userId },
      { $addToSet: { badges: badge } },
      { new: true, upsert: true }
    );
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;