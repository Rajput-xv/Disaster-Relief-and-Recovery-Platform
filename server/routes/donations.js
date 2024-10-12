const router = require('express').Router();
const Donation = require('../models/Donation');
const { recordDonationOnBlockchain } = require('../services/blockchainService');

router.post('/', async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    const transactionHash = await recordDonationOnBlockchain(donation._id, donation.amount, donation.donor);
    donation.transactionHash = transactionHash;
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
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