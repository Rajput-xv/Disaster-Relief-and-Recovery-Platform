const router = require('express').Router();
const Event = require('../models/Event');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('registeredParticipants', 'username');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/register', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.registeredParticipants.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is full' });
    }
    if (event.registeredParticipants.some(participant => participant.equals(req.userId))) {
      return res.status(400).json({ message: 'User already registered' });
    }
    event.registeredParticipants.push(req.userId);
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get latest events
router.get('/latest', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 }).limit(5);
    res.json(events);
  } catch (error) {
    console.error('Error fetching latest events:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;