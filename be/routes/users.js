const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Listing = require('../models/Listing');

// GET /api/users/:userId - Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-__v');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/users/email/:email - Get user by email
router.get('/email/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-__v');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/users/:userId/listings - Get user's listings
router.get('/:userId/listings', async (req, res) => {
  try {
    const listings = await Listing.find({ seller: req.params.userId })
      .populate('seller', 'name email picture')
      .sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
