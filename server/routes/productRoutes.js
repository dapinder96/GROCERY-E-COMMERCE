const express = require("express")
const router = express.Router()
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

module.exports = router

