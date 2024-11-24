const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const User = require('../models/User'); // Assuming you have a User model

router.post('/', async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();

    // Update user points
    const user = await User.findById(donation.donor);
    if (user) {
      user.points += donation.amount; // Assuming 1 point per unit of currency
      await user.save();
    }

    res.status(201).json(donation);
  } catch (error) {
    console.error('Error processing donation:', error); // Log the error
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().populate('donor', 'username');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;