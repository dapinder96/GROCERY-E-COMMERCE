const express = require('express');
const imageController = require('../controllers/productImageController');
const router = express.Router();

router.post('/add-image', imageController.addProductImage);
router.get('/images', imageController.getProductImages);
router.delete('/delete-image/:id', imageController.deleteProductImage);

module.exports = router;
