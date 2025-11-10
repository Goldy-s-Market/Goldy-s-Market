const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

/*
// POST /api/auth/google - Handle Google Sign-In (token-based client flow)
// Kept for reference; OAuth flow implemented below using passport.
// Check no longer needed as Google handles institution check
router.post('/google', catchAsync(async (req, res) => {
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
    
    // Generate JWT token for the user (include name + picture for convenience)
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name, picture: user.picture },
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
}));
*/

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /api/auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: (process.env.FRONTEND_URL || 'http://localhost:5173') + '/login?error=auth' }), (req, res) => {
  const user = req.user;
  const token = jwt.sign({ userId: user._id, email: user.email, name: user.name, picture: user.picture }, process.env.JWT_SECRET, { expiresIn: '7d' });
  const redirectTo = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?token=${token}`;
  res.redirect(redirectTo);
});

// Demo route to get a demo token (creates or finds a demo user)
router.get('/demo', catchAsync(async (req, res) => {
  const demoEmail = 'demo@umn.edu';
  let user = await User.findOne({ email: demoEmail });
  if (!user) {
    user = new User({ email: demoEmail, name: 'Demo User', picture: '', isAuthenticated: true });
    await user.save();
  }
  const token = jwt.sign({ userId: user._id, email: user.email, name: user.name, picture: user.picture }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, picture: user.picture } });
}));

// POST /api/auth/verify-token
router.post('/verify-token', catchAsync(async (req, res) => {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-__v');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ valid: true, user });
}));

// POST /api/auth/logout - Logout
router.post('/logout', catchAsync(async (req, res) => {
    const { userId } = req.body;
    if (userId) {
      await User.findByIdAndUpdate(userId, { isAuthenticated: false });
    }
    res.json({ message: 'Logout successful' });
}));

module.exports = router;
