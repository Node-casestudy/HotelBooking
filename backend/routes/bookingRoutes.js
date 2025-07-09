const express = require('express');
const { bookRoom, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/book', protect, bookRoom);
router.get('/my-bookings', protect, getMyBookings);

module.exports = router;