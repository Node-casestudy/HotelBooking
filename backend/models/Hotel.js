const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: { type: String, required: true },
  address: String,
  contactEmail: String,
  contactPhone: String,
  images: [String], // Array of image URLs
  amenities: [String], // Example: ['WiFi', 'AC', 'Pool', 'Parking']
  isActive: { type: Boolean, default: true }, // Useful for enabling/disabling listings
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
