const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// POST /api/auth/google - Handle Google Sign-In
router.post('/google', async (req, res) => {
  try {
    const { email, name, picture } = req.body;

    //Authenticate umn email
    const emailDomain = email.split('@')[1];
    if (emailDomain !== 'umn.edu') {
        return res.status(403).json({ 
            error: 'Access restricted to UMN students. Please use your @umn.edu email address.' 
        });
    }
    
    // Check if user already exists by email
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user with Google data
      user = new User({
        email,
        name,
        picture,
        isAuthenticated: true
      });
      await user.save();
    } else {
      // Update existing user's information
      user.name = name;
      user.picture = picture;
      user.isAuthenticated = true;
      await user.save();
    }
    
    // Generate JWT token for the user
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ 
      message: 'Authentication successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        isAuthenticated: user.isAuthenticated
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /api/auth/verify-token - Verify JWT token
router.post('/verify-token', async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-__v');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ valid: true, user });
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
});

// POST /api/auth/logout - Logout
router.post('/logout', async (req, res) => {
  try {
    const { userId } = req.body;
    if (userId) {
      await User.findByIdAndUpdate(userId, { isAuthenticated: false });
    }
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
