const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.GOOGLE_CALLBACK_URL || `${process.env.BACKEND_URL || 'http://localhost:8080'}/api/auth/google/callback`;

if (!clientID || !clientSecret) {
  console.warn('Google OAuth client ID/secret not set. Google OAuth will not work until env vars are configured.');
}

passport.use(new GoogleStrategy({
  clientID,
  clientSecret,
  callbackURL,
  passReqToCallback: true
}, async function(request, accessToken, refreshToken, profile, done) {
  try {
    const email = profile && profile.emails && profile.emails[0] && profile.emails[0].value;
    const name = profile.displayName || (profile.name && `${profile.name.givenName} ${profile.name.familyName}`) || 'Unnamed';
    const picture = profile && profile.photos && profile.photos[0] && profile.photos[0].value;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name, picture, isAuthenticated: true });
      await user.save();
    } else {
      user.name = name;
      user.picture = picture;
      user.isAuthenticated = true;
      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-__v');
    done(null, user);
  } catch (err) {
    done(err);
  }
});
