const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    //categories of items
    category: {type: String, enum: ['books', 'electronics', 'furniture', 'clothing', 'services', 'tickets', 'other']},
    images: [String],
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    status: {type: String, enum: ['active', 'sold', 'inactive'], default: 'active'},
}, {timestamps: true});

module.exports = mongoose.model('Listing', listingSchema);