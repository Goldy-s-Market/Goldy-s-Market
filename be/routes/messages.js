const express = require('express');
const router = express.Router();
const Message = require('../models/Messages');

// GET /api/messages/:userId - Get all conversations for a user
router.get('/:userId', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.params.userId },
        { recipient: req.params.userId }
      ]
    })
    .populate('sender', 'name email picture')
    .populate('recipient', 'name email picture')
    .populate('listing', 'title price')
    .sort({ createdAt: -1 });
    
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/messages/conversation/:userId/:otherUserId - Get conversation between two users
router.get('/conversation/:userId/:otherUserId', async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: otherUserId },
        { sender: otherUserId, recipient: userId }
      ]
    })
    .populate('sender', 'name picture')
    .populate('recipient', 'name picture')
    .populate('listing', 'title')
    .sort({ createdAt: 1 });
    
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /api/messages - Send new message
router.post('/', async (req, res) => {
  try {
    const { sender, recipient, content, listing } = req.body;
    const newMessage = new Message({
      sender,
      recipient,
      content,
      listing
    });
    await newMessage.save();
    
    const populatedMessage = await Message.findById(newMessage._id)
      .populate('sender', 'name email picture')
      .populate('recipient', 'name email picture')
      .populate('listing', 'title');
    
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
