const { Brand } = require('../models'); // Import the Brand model

// Create a new brand
exports.createBrand = async (req, res) => {
    try {
        const { name, description } = req.body;
        const brand = await Brand.create({ name, description });
        res.status(201).json({ message: 'Brand created successfully', brand });
    } catch (error) {
        res.status(500).json({ message: 'Error creating brand', error: error.message });
    }
};

// Get all brands
exports.getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brands', error: error.message });
    }
};

// Get a single brand by ID
exports.getBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findByPk(id);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brand', error: error.message });
    }
};

// Update a brand by ID
exports.updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const brand = await Brand.findByPk(id);

        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        await brand.update({ name, description });
        res.status(200).json({ message: 'Brand updated successfully', brand });
    } catch (error) {
        res.status(500).json({ message: 'Error updating brand', error: error.message });
    }
};

// Delete a brand by ID
exports.deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findByPk(id);

        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        await brand.destroy();
        res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting brand', error: error.message });
    }
};
