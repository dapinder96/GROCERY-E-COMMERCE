const express = require("express")
const cors = require("cors")
const path = require("path")
const { connectDB } = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")
const testimonialRoutes = require("./routes/testimonialRoutes")
const multer = require("multer")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const app = express()

// Middleware
app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"))

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, "product-" + Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage: storage })

// Connect to database
connectDB()

// Routes
app.use("/api", userRoutes)
app.use("/api", productRoutes)
app.use("/api", cartRoutes)
app.use("/api", orderRoutes)
app.use("/api/testimonials", testimonialRoutes)
const SECRET_KEY = "your_secret_key_here" // Replace with a secure secret key

//Signup and Login routes are moved to userRoutes.js

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

