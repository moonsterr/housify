import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  display: {
    type: String,
    default: 'steve jobs',
  },
  email: {
    type: String,
    default: 'stevejobs@gmail.com',
  },
});

export default mongoose.model('User', userSchema);
