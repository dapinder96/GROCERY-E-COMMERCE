const express = require('express');

const productController = require('../controllers/productController');
const router = express.Router();

router.post('/add-product', productController.addProduct);
router.get('/products', productController.getProducts);
router.put('/update-product/:id', productController.updateProduct);
router.delete('/delete-product/:id', productController.deleteProduct);


module.exports = router;
