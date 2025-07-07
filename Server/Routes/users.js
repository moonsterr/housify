import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

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

export default router;
