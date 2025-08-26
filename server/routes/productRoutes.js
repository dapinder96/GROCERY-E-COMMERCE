const express = require("express")
const router = express.Router()
const { client } = require('../config/db');

const upload = require("../middleware/upload")
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getDashboardStats,
} = require("../controllers/productController")

router.post("/products", upload.single("image"), createProduct)
router.get("/products", getProducts)
router.put("/products/:id", upload.single("image"), updateProduct)
router.delete("/products/:id", deleteProduct)
router.get("/dashboard-stats", getDashboardStats)
router.get('/products/:id', async (req, res) => {
  try {
    const result = await client.query(
      'SELECT * FROM products WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});


module.exports = router

