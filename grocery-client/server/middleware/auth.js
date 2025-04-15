const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config/auth")

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." })
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    res.status(403).json({ message: "Invalid token" })
  }
}

module.exports = { authenticateToken }

