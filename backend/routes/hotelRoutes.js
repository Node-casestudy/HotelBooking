const express = require('express');
const router = express.Router();

const {
  addHotel,
  getHotels,
  getHotelById,
  getMyHotels,
} = require('../controllers/hotelController');

const { protect } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Add hotel - only by owner
router.post('/add', protect, checkRole('owner'), upload.array('images', 5), addHotel);

// ✅ FIRST: Route to get hotels by logged-in owner
router.get('/my-hotels', protect, checkRole('owner'), getMyHotels);

// ✅ Then: Get all hotels
router.get('/', getHotels);

// ✅ LAST: Get hotel by ID
router.get('/:id', getHotelById);

module.exports = router;
