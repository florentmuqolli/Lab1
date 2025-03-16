const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware(['admin']));

router.get('/users', adminController.getAllUsers);
router.post('/users', adminController.createUser);
router.put('/users/:userId', adminController.updateUser);
router.delete('/users/:userId', adminController.deleteUser);

router.get('/tours', adminController.getAllTours);
router.post('/tours', adminController.createTour);
router.put('/tours/:tourId', adminController.updateTour);
router.delete('/tours/:tourId', adminController.deleteTour);

router.get('/bookings', adminController.getAllBookings);
router.post('/bookings', adminController.createBooking);
router.put('/bookings/:bookingId', adminController.updateBooking);
router.delete('/bookings/:bookingId', adminController.deleteBooking);

module.exports = router;