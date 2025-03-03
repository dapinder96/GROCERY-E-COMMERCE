const { Category } = require('../models');

// Add Multiple Categories
exports.addCategories = async (req, res) => {
  try {
    const { categories } = req.body; // Expecting an array of category names
    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ error: 'Invalid input, expected an array of categories' });
    }
    
    const categoryData = categories.map(name => ({ category_name: name }));
    const createdCategories = await Category.bulkCreate(categoryData);
    
    res.status(201).json(createdCategories);
  } catch (error) {
    res.status(500).json({ error: 'Error adding categories' });
  }
};

// Get All Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
};
