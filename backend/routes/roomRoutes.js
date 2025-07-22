const express = require('express');
const { addRoom, getRoomsByHotel, getRoomById } = require('../controllers/roomController');
const { protect } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if (!token) return res.status(401).send("Access denied");
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send("Invalid token");
    }
  };
  

router.post('/add', protect, checkRole('owner'), addRoom);
router.get('/hotel/:hotelId',verifyToken, getRoomsByHotel);
router.get('/:id', getRoomById);
// router.put('edit/:id', protect, updateRoom);

module.exports = router;
