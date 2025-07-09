const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  fromDate: Date,
  toDate: Date,
  guests: Number,
  totalFare: Number,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
