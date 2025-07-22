const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' ,required:"true"},
  roomType: String,
  description: String,
  baseFare: Number,
  capacity: Number,
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
