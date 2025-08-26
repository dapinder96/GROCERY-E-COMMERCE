const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');

router.post('/create-order', authenticateToken, paymentController.createOrder);
router.post('/verify-payment', authenticateToken, paymentController.verifyPayment);

module.exports = router;