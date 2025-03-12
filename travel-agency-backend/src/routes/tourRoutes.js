const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, tourController.getAllTours);
router.post('/', authMiddleware, tourController.createTour);
router.get('/protected', authMiddleware, tourController.getProtectedData);

module.exports = router;