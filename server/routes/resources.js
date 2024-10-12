const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const auth = require('../middleware/auth'); // Import the auth middleware

// Create a new resource
router.post('/', auth, async (req, res) => {
    try {
        const resource = new Resource({
            ...req.body,
            createdBy: req.userId  // Using req.userId as set by your auth middleware
        });
        await resource.save();
        res.status(201).json(resource);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all resources
router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific resource
router.get('/:id', async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.json(resource);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a resource
router.put('/:id', auth, async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.json(resource);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a resource
router.delete('/:id', auth, async (req, res) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.json({ message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;