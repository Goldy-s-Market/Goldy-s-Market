const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Message = require('../models/Messages');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const catchAsync = require('../utils/catchAsync');

//Order fix - /conversation/... could accidentally match /:userId
// GET /api/messages/conversation/:userId/:otherUserId - Get conversation between two users
router.get('/conversation/:userId/:otherUserId', catchAsync(async (req, res) => {
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
}));

// GET /api/messages/conversations/:userId - Get all conversations for a user with last message
router.get('/conversations/:userId', authMiddleware, catchAsync(async (req, res) => {
    const { userId } = req.params;
    
    // Use aggregation to get unique conversations with last message
    const userIdObj = new mongoose.Types.ObjectId(userId);
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: userIdObj },
            { recipient: userIdObj }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', userIdObj] },
              '$recipient',
              '$sender'
            ]
          },
          lastMessage: { $first: '$$ROOT' },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$recipient', userIdObj] },
                    { $ne: ['$read', true] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $sort: { 'lastMessage.createdAt': -1 }
      }
    ]);

    // Populate user data for each conversation
    const populatedConversations = await Promise.all(
      conversations.map(async (conv) => {
        const otherUserId = conv._id;
        const otherUser = await User.findById(otherUserId).select('name email picture');
        
        if (!otherUser) {
          return null;
        }

        const lastMsg = conv.lastMessage;
        const isOwn = lastMsg.sender.toString() === userId;
        
        // Format timestamp
        const messageTime = new Date(lastMsg.createdAt);
        const now = new Date();
        const diffMs = now - messageTime;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        let timeAgo = '';
        if (diffMins < 1) {
          timeAgo = 'Just now';
        } else if (diffMins < 60) {
          timeAgo = `${diffMins}m ago`;
        } else if (diffHours < 24) {
          timeAgo = `${diffHours}h ago`;
        } else if (diffDays < 7) {
          timeAgo = `${diffDays}d ago`;
        } else {
          timeAgo = messageTime.toLocaleDateString();
        }

        return {
          id: otherUser._id.toString(),
          name: otherUser.name,
          email: otherUser.email,
          avatar: otherUser.picture || 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
          online: false, // TODO: Implement online status tracking
          lastMessage: lastMsg.content,
          lastMessageTime: timeAgo,
          unreadCount: conv.unreadCount,
          lastMessageTimestamp: lastMsg.createdAt
        };
      })
    );

    // Filter out null values (in case user was deleted)
    const validConversations = populatedConversations.filter(conv => conv !== null);
    
    res.json(validConversations);
}));

// GET /api/messages/:userId - Get all conversations for a user
router.get('/:userId', authMiddleware, catchAsync(async (req, res) => {
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
}));

// POST /api/messages - Send new message
router.post('/', authMiddleware, catchAsync(async (req, res) => {
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
}));

module.exports = router;
