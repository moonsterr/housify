// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
// import apiRoutesHouses from './Routes/houses.js';
import apiRoutesUsers from './Routes/users.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
connectDb();

const PORT = 3000;
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api/houses', apiRoutesHouses);
app.use('/api/users', apiRoutesUsers);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
