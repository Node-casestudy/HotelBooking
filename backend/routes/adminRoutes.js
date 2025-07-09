const express = require('express');
const { getPendingOwners, verifyOwner } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');
const router = express.Router();

router.get('/pending-owners', protect, checkRole('admin'), getPendingOwners);
router.put('/verify-owner/:id', protect, checkRole('admin'), verifyOwner);

module.exports = router;
