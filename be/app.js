require("dotenv").config();

const express = require("express"); // Fixed typo from "expresss"
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 8080;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/goldysmarket')
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// CORS middleware (if frontend is on different port)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Update with your frontend URL in production
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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

// Start server
app.listen(PORT, () => {
  console.log(`App is live. Listening on port ${PORT}`);
  console.log(`Go over to http://localhost:${PORT}/`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});
