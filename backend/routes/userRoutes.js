const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authmiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/all', authMiddleware, userController.getAllUsers); // Protected route

module.exports = router;
