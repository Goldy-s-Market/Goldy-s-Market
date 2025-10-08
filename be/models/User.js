const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    picture: String,
    isAuthenticated: {type: Boolean, default: true}
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);