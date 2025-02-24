const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

// Define routes
router.post('/brands', brandController.createBrand);
router.get('/brands', brandController.getAllBrands);
router.get('/brands/:id', brandController.getBrandById);
router.put('/brands/:id', brandController.updateBrand);
router.delete('/brands/:id', brandController.deleteBrand);

module.exports = router;
