const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// GET /api/listings - Get all active listings with optional filters
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, status } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;
    else filter.status = 'active'; // Default to active listings
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    const listings = await Listing.find(filter).populate('seller', 'name email').sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/listings/:listingId - Get specific listing with seller info
router.get('/:listingId', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.listingId).populate('seller', 'name email');
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /api/listings - Create new listing
router.post('/', async (req, res) => {
  try {
    const { title, description, price, category, images, seller } = req.body;
    const newListing = new Listing({
      title,
      description,
      price,
      category,
      images,
      seller
    });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/listings/:listingId - Update listing
router.put('/:listingId', async (req, res) => {
  try {
    const { title, description, price, category, images, status } = req.body;
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.listingId,
      { title, description, price, category, images, status },
      { new: true, runValidators: true }
    );
    
    if (!updatedListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(updatedListing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/listings/:listingId - Delete listing
router.delete('/:listingId', async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.listingId);
    if (!deletedListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/listings/category/:category - Get listings by category
router.get('/category/:category', async (req, res) => {
  try {
    const listings = await Listing.find({ 
      category: req.params.category,
      status: 'active'
    }).populate('seller', 'name email');
    res.json(listings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
