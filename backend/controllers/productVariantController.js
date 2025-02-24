const { ProductVariant } = require('../models');

// Add a product variant
exports.addProductVariant = async (req, res) => {
  try {
    const variant = await ProductVariant.create(req.body);
    res.status(201).json(variant);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product variant', error });
  }
};

// Get all product variants
exports.getProductVariants = async (req, res) => {
  try {
    const variants = await ProductVariant.findAll();
    res.status(200).json(variants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product variants', error });
  }
};

// Update a product variant
exports.updateProductVariant = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductVariant.update(req.body, { where: { id } });
    res.status(200).json({ message: 'Product variant updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product variant', error });
  }
};

// Delete a product variant
exports.deleteProductVariant = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductVariant.destroy({ where: { id } });
    res.status(200).json({ message: 'Product variant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product variant', error });
  }
};
