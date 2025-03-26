const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware  = require('../middleware/authMiddleware');
router.use(authMiddleware(['user']));

router.get('/', bookingController.getBookingsByUser);

module.exports = router;