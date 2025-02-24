const { ProductImage } = require('../models');

// Add a product image
exports.addProductImage = async (req, res) => {
  try {
    const image = await ProductImage.create(req.body);
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product image', error });
  }
};

// Get all product images
exports.getProductImages = async (req, res) => {
  try {
    const images = await ProductImage.findAll();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product images', error });
  }
};

// Delete a product image
exports.deleteProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductImage.destroy({ where: { id } });
    res.status(200).json({ message: 'Product image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product image', error });
  }
};
