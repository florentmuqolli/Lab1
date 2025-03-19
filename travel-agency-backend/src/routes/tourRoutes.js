const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, tourController.getAllTour);
router.post('/', authMiddleware, tourController.createTour);
router.get('/protected', authMiddleware, tourController.getProtectedData);

module.exports = router;