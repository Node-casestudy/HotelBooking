const express = require('express');
const { makePayment, getMyPayments } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/pay', protect, makePayment);
router.get('/my-payments', protect, getMyPayments);

module.exports = router;