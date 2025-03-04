const express = require("express")
const router = express.Router()
const { addToCart, getUserCart, updateCartItem, removeCartItem } = require("../controllers/cartController")

router.post("/cart", addToCart)
router.get("/cart/:userId", getUserCart)
router.put("/cart/:userId/:productId", updateCartItem)
router.delete("/cart/:userId/:productId", removeCartItem)

module.exports = router

