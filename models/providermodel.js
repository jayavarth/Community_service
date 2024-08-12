const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
  providerId: {
    type: String,
    required: true,
  },
  providername: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true,
  },
  servicesOffered: [String],
  experience: {
    type: Number,
    required: true,
  },
  pricing: {
    type: String,
    required: true,
  },
  availability: {
    Monday: { type: Boolean, default: false },
    Tuesday: { type: Boolean, default: false },
    Wednesday: { type: Boolean, default: false },
    Thursday: { type: Boolean, default: false },
    Friday: { type: Boolean, default: false },
    Saturday: { type: Boolean, default: false },
    Sunday: { type: Boolean, default: false },
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  ratings: {
    type: [Number],
    default: [],
  },
  averageRating: {
    type: Number,
    default: 0,
  }
});

const Provider = mongoose.model('Provider', ProviderSchema);
module.exports = Provider;
