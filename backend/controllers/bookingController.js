const Booking = require('../models/Booking');
const Room = require('../models/Room');

exports.bookRoom = async (req, res) => {
  const { roomId, hotelId, fromDate, toDate, guests, totalFare } = req.body;
  const room = await Room.findById(roomId);
  if (!room.isAvailable) return res.status(400).json({ message: 'Room not available' });
  room.isAvailable = false;
  await room.save();
  const booking = await Booking.create({
    user: req.user.id, room: roomId, hotel: hotelId, fromDate, toDate, guests, totalFare
  });
  res.status(201).json(booking);
};

exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate('room hotel');
  res.json(bookings);
};