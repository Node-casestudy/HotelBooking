const express = require('express');
const { addRoom, getRoomsByHotel, getRoomById } = require('../controllers/roomController');
const { protect } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/add', protect, checkRole('owner'), addRoom);
router.get('/hotel/:hotelId', getRoomsByHotel);
router.get('/:id', getRoomById);

module.exports = router;
