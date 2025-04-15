const express = require('express');
const router = express.Router();
const { addTestimonial, getAllTestimonials, getUserTestimonials } = require('../controllers/testimonialController');
const { authenticateToken } = require('../middleware/auth');

router.post('/add', authenticateToken, addTestimonial);
router.get('/all', getAllTestimonials);
router.get('/user/:user_id', getUserTestimonials);

module.exports = router;