const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, bookingController.createBooking);
router.get('/', authMiddleware, bookingController.getBookingsByUser);
router.put('/:bookingId', authMiddleware, bookingController.updateBookingStatus);
router.delete('/:bookingId', authMiddleware, bookingController.deleteBooking);

module.exports = router;