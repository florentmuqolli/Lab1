const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', tourController.getAllTours);
router.post('/', authMiddleware, tourController.createTour);

module.exports = router;