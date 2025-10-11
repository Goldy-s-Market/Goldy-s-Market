const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Listing = require('../models/Listing');
const catchAsync = require('../utils/catchAsync');

// GET /api/users/email/:email - Get user by email
router.get('/email/:email', catchAsync(async (req, res) => {
    const user = await User.findOne({ email: req.params.email }).select('-__v');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
}));

// GET /api/users/:userId/listings - Get user's listings
router.get('/:userId/listings', catchAsync(async (req, res) => {
    const listings = await Listing.find({ seller: req.params.userId })
      .populate('seller', 'name email picture')
      .sort({ createdAt: -1 });
    res.json(listings);
}));

// GET /api/users/:userId - Get user profile
router.get('/:userId', catchAsync(async (req, res) => {
    const user = await User.findById(req.params.userId).select('-__v');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
}));

module.exports = router;
