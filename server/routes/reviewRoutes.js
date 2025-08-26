const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, reviewController.createReview);
router.get('/:productId', reviewController.getProductReviews);

module.exports = router;