const Room = require('../models/Room');

exports.addRoom = async (req, res) => {
  const { hotelId, roomType, description, baseFare, capacity } = req.body;
  const room = await Room.create({ hotel: hotelId, roomType, description, baseFare, capacity });
  res.status(201).json(room);
};

// exports.getRoomsByHotel = async (req, res) => {
//   const rooms = await Room.find({ hotel: req.params.hotelId });
//   res.json(rooms);
// };
exports.getRoomsByHotel  = async(req,res) =>
{
  const rooms = await Room.find({hotel: req.params.hotelId});
  res.json(rooms);
}

// exports.getRoomById = async (req, res) => {
//   const room = await Room.findById(req.params.id);
//   res.json(room);
// };

// GET room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('hotel', 'name');
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT update room
exports.updateRoom = async (req, res) => {
  try {
    const updated = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Room not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update room' });
  }
};

// module.exports = { getRoomById, updateRoom };