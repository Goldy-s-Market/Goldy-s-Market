const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./users');
const listingRoutes = require('./listings');
const messageRoutes = require('./messages');
const searchRoutes = require('./search');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/listings', listingRoutes);
router.use('/messages', messageRoutes);
router.use('/search', searchRoutes);

module.exports = router;

