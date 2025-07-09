const Payment = require('../models/Payment');

exports.makePayment = async (req, res) => {
  const { bookingId, amount } = req.body;
  const payment = await Payment.create({ booking: bookingId, user: req.user.id, amount });
  res.status(201).json(payment);
};

exports.getMyPayments = async (req, res) => {
  const payments = await Payment.find({ user: req.user.id }).populate('booking');
  res.json(payments);
};