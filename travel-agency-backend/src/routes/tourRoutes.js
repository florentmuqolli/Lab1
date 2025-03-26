const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const authMiddleware = require('../middleware/authMiddleware');
router.use(authMiddleware(['user']));

router.get('/', tourController.getAllTour);
router.post('/', tourController.createTour);
router.get('/protected', tourController.getProtectedData);

module.exports = router;