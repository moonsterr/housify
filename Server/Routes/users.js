import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';
import dotenv from 'dotenv';
import authenticateToken from '../middleware/middleware.js';

dotenv.config();
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
console.log('CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);

router.post('/create', async (req, res) => {
  try {
    const alreadyUser = await User.findOne({ username: req.body.username });
    if (alreadyUser) {
      return res.status(409).send({ success: false, data: 'already exists' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    return res
      .status(201)
      .send({ success: true, data: 'User created succsfuly' });
  } catch (error) {
    console.error('🔴 Error creating user:', error); // print full error

    return res.status(400).send({ success: false, data: error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send({ success: false, data: 'username' });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).send({ success: false, data: 'password' });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET
    );
    return res.status(200).send({ success: true, data: token });
  } catch (error) {
    return res.status(500).send({ success: false, data: 'server' });
  }
});

//Google o auth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL:
        'https://housify-ztdw.onrender.com/api/users/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        let username = null;
        if (profile.username) {
          username = profile.username;
        } else if (profile.displayName) {
          username = profile.displayName.toLowerCase().replace(/\s+/g, '');
        } else if (profile.emails && profile.emails.length > 0) {
          username = profile.emails[0].value.split('@')[0];
        } else {
          username = `user_${googleId}`;
        }

        let user = await User.findOne({ password: googleId });

        if (!user) {
          user = new User({
            username: username,
            password: googleId, // Not secure but per your request
            googleId: googleId,
          });
          await user.save();
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }), // session false if no express-session
  (req, res) => {
    // req.user is the authenticated user object from done()
    const token = jwt.sign(
      { userId: req.user._id, username: req.user.username },
      process.env.JWT_SECRET
    );
    console.log(token);
    // res.json({ success: true, data: token });
    res.redirect(`https://housify-seven.vercel.app/gauth?token=${token}`);
  }
);

router.get('/getUser', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.userId);
  return res.status(200).send({ success: true, data: user });
});

router.put('/editUser', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { display: req.body.display, email: req.body.email },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ success: false, data: 'not found' });
    }

    return res.status(200).send({ success: true, data: updatedUser });
  } catch (error) {
    console.error('PUT error:', error);
    return res.status(500).send({ success: false, data: 'Server error' });
  }
});
export default router;
