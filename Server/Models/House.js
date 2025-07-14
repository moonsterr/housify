import mongoose from 'mongoose';
const houseSchema = new mongoose.Schema({
  for: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  parkingSpot: {
    type: Boolean,
    required: true,
  },
  furnished: {
    type: Boolean,
    required: true,
  },
  address: {
    required: true,
    type: String,
    trim: true,
  },
  offer: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
  },
  url: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

export default mongoose.model('House', houseSchema);
