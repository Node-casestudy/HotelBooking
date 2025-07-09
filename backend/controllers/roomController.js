const Room = require('../models/Room');

exports.addRoom = async (req, res) => {
  const { hotelId, roomType, description, baseFare, capacity } = req.body;
  const room = await Room.create({ hotel: hotelId, roomType, description, baseFare, capacity });
  res.status(201).json(room);
};

exports.getRoomsByHotel = async (req, res) => {
  const rooms = await Room.find({ hotel: req.params.hotelId });
  res.json(rooms);
};

exports.getRoomById = async (req, res) => {
  const room = await Room.findById(req.params.id);
  res.json(room);
};