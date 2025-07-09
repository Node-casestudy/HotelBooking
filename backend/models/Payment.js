const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  paymentDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Completed' },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
