const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware  = require('../middleware/authMiddleware');

router.get('/', authMiddleware, bookingController.getBookingsByUser);

module.exports = router;