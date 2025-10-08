const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// GET /api/search?q=keyword&category=books&minPrice=10&maxPrice=100
router.get('/', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;
    let filter = { status: 'active' };
    
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }
    
    if (category) filter.category = category;
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    const listings = await Listing.find(filter)
      .populate('seller', 'name email picture')
      .sort({ createdAt: -1 });
    
    res.json(listings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
