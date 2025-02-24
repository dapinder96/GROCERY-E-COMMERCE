const express = require('express');
const variantController = require('../controllers/productVariantController');
const router = express.Router();

router.post('/add-variant', variantController.addProductVariant);
router.get('/variants', variantController.getProductVariants);
router.put('/update-variant/:id', variantController.updateProductVariant);
router.delete('/delete-variant/:id', variantController.deleteProductVariant);

module.exports = router;
