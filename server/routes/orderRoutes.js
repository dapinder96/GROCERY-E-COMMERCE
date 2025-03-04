const express = require("express")
const router = express.Router()
const {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getOrderDetails,
  deleteOrder,
  getUserOrderHistory,
  getOrderStats,
  getAllOrders,
  getOrderAnalytics,
} = require("../controllers/orderController")

router.get("/orders/analytics", getOrderAnalytics)
router.post("/orders", createOrder)
router.get("/orders/:userId", getUserOrders)
router.get("/user-history", getUserOrderHistory);

router.put("/orders/:orderId/status", updateOrderStatus)
router.get("/orders/:orderId", getOrderDetails)
router.delete("/orders/:orderId", deleteOrder)
router.get("/orders/stats", getOrderStats)
router.get("/orders", getAllOrders)

module.exports = router

