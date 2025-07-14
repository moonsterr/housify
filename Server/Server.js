// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
// import apiRoutesHouses from './Routes/houses.js';
import apiRoutesUsers from './Routes/users.js';
import apiRoutesHouses from './Routes/houses.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import path from 'path';
dotenv.config({ path: path.resolve('Server/.env') });
connectDb();

const PORT = 3000;
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api/houses', apiRoutesHouses);
app.use('/api/users', apiRoutesUsers);
app.use('/api/houses', apiRoutesHouses);

app.use(passport.initialize());
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
