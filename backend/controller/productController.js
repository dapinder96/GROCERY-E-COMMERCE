const { Product, Category, Brand } = require('../models');

exports.createProduct = async (req, res) => {
    try {
        const { name, category_id, brand_id, price, stock, description } = req.body;

        // Check if category exists
        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(400).json({ message: "Invalid category_id. Category does not exist." });
        }

        // Check if brand exists
        const brand = await Brand.findByPk(brand_id);
        if (!brand) {
            return res.status(400).json({ message: "Invalid brand_id. Brand does not exist." });
        }

        // Create product
        const product = await Product.create({ name, category_id, brand_id, price, stock, description });

        return res.status(201).json({ message: "Product created successfully", product });

    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.json(products);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const { name, category_id, brand_id, price, stock, description } = req.body;

        // Check if category exists
        if (category_id) {
            const category = await Category.findByPk(category_id);
            if (!category) {
                return res.status(400).json({ message: "Invalid category_id. Category does not exist." });
            }
        }

        // Check if brand exists
        if (brand_id) {
            const brand = await Brand.findByPk(brand_id);
            if (!brand) {
                return res.status(400).json({ message: "Invalid brand_id. Brand does not exist." });
            }
        }

        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        await product.update({ name, category_id, brand_id, price, stock, description });

        return res.json({ message: "Product updated successfully", product });

    } catch (error) {
        return res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        await product.destroy();
        return res.json({ message: "Product deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};
