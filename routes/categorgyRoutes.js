const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/add-multiple', categoryController.addCategories);
router.get('/all', categoryController.getCategories);
router.delete('/delete/:id', categoryController.deleteCategory);

module.exports = router;