const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const authMiddleware = require('../middleware/authMiddleware');
const catchAsync = require('../utils/catchAsync');

// GET /api/listings - Get all active listings with optional filters
router.get('/', catchAsync(async (req, res) => {
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
}));

//Order fixed - /category/books might accidentally match /:listingId as listingId = "category"
// GET /api/listings/category/:category - Get listings by category
router.get('/category/:category', catchAsync(async (req, res) => {
    const listings = await Listing.find({ 
      category: req.params.category,
      status: 'active'
    }).populate('seller', 'name email');
    res.json(listings);
}));

// GET /api/listings/:listingId - Get specific listing with seller info
router.get('/:listingId', catchAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.listingId).populate('seller', 'name email');
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json(listing);
}));

// POST /api/listings - Create new listing
router.post('/', authMiddleware, catchAsync(async (req, res) => {
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
}));

// PUT /api/listings/:listingId - Update listing
router.put('/:listingId', authMiddleware, catchAsync(async (req, res) => {
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
}));

// DELETE /api/listings/:listingId - Delete listing
router.delete('/:listingId', authMiddleware, catchAsync(async (req, res) => {
    const deletedListing = await Listing.findByIdAndDelete(req.params.listingId);
    if (!deletedListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }
    res.json({ message: 'Listing deleted successfully' });
}));

module.exports = router;
