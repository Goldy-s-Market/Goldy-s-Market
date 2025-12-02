require("dotenv").config();

const express = require("express"); // Fixed typo from "expresss"
const mongoose = require("mongoose");
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Message = require('./models/Messages');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/goldysmarket')
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// CORS middleware (if frontend is on different port)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Session + Passport (for OAuth flows)
// Note: We still generate JWTs for the frontend; session is used for passport flow handling.
app.use(session({
  secret: process.env.SESSION_SECRET || process.env.JWT_SECRET || 'super-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // TODO: secure should be true in production with HTTPS
}));

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Import routes
const routes = require('./routes');

// Mount API routes
app.use('/api', routes);

// Root route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: "Goldy's Market API is running!",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      users: "/api/users",
      listings: "/api/listings",
      messages: "/api/messages",
      search: "/api/search"
    }
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST']
  }
});

// Socket.IO Authentication Middleware
io.use(async (socket, next) => {
  try {
    // Try to get token from auth object first, then from headers
    const token = socket.handshake.auth?.token || 
                  socket.handshake.headers?.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return next(new Error('Authentication error: Invalid token'));
    }

    const user = await User.findById(decoded.userId).select('-__v');
    if (!user) {
      return next(new Error('Authentication error: User not found'));
    }

    socket.userId = user._id.toString();
    socket.user = user;
    next();
  } catch (error) {
    next(new Error('Authentication error: ' + error.message));
  }
});

// Socket.IO Connection Handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.userId} (Socket ID: ${socket.id})`);

  // Handle joining a conversation room
  socket.on('join-conversation', (data) => {
    const { contactId } = data;
    const userId = socket.userId;
    
    if (!contactId) {
      socket.emit('error', { message: 'Contact ID is required' });
      return;
    }

    const roomName = [userId, contactId].sort().join('-');
    socket.join(roomName);
    console.log(`User ${userId} joined conversation with ${contactId} in room: ${roomName}`);
  });

  // Handle sending messages
  socket.on('send-message', async (messageData) => {
    try {
      const { receiverId, content, listing } = messageData;
      const senderId = socket.userId;

      if (!receiverId || !content) {
        socket.emit('error', { message: 'Receiver ID and content are required' });
        return;
      }

      // Create and save message to database
      const newMessage = new Message({
        sender: senderId,
        recipient: receiverId,
        content: content,
        listing: listing || null
      });

      await newMessage.save();

      // Populate the message with user and listing data
      const populatedMessage = await Message.findById(newMessage._id)
        .populate('sender', 'name email picture')
        .populate('recipient', 'name email picture')
        .populate('listing', 'title');

      // Create room name for the conversation
      const roomName = [senderId, receiverId].sort().join('-');

      // Format message for frontend
      const messageToEmit = {
        id: populatedMessage._id.toString(),
        senderId: populatedMessage.sender._id.toString(),
        receiverId: populatedMessage.recipient._id.toString(),
        text: populatedMessage.content,
        timestamp: new Date(populatedMessage.createdAt).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit' 
        }),
        createdAt: populatedMessage.createdAt,
        sender: {
          id: populatedMessage.sender._id.toString(),
          name: populatedMessage.sender.name,
          picture: populatedMessage.sender.picture
        },
        recipient: {
          id: populatedMessage.recipient._id.toString(),
          name: populatedMessage.recipient.name,
          picture: populatedMessage.recipient.picture
        },
        listing: populatedMessage.listing ? {
          id: populatedMessage.listing._id.toString(),
          title: populatedMessage.listing.title
        } : null
      };

      // Emit to all clients in the room (including sender for confirmation)
      io.to(roomName).emit('receive-message', messageToEmit);
      
      console.log(`Message sent from ${senderId} to ${receiverId}:`, content);
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message', error: error.message });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.userId} (Socket ID: ${socket.id})`);
  });
});

// Make io available to routes if needed
app.set('io', io);

// Start server
server.listen(PORT, () => {
  console.log(`App is live. Listening on port ${PORT}`);
  console.log(`Go over to http://localhost:${PORT}/`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
  console.log(`Socket.IO server is running on port ${PORT}`);
});
