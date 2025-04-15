const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { client } = require("../config/db")
const { SECRET_KEY } = require("../config/auth")

const registerUser = async (req, res) => {
  const { name, email, password, phone, state, city } = req.body

  try {
    const userExists = await client.query("SELECT * FROM users WHERE email = $1", [email])
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await client.query(
      "INSERT INTO users (name, email, password, phone, state, city) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, hashedPassword, phone, state, city],
    )

    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await client.query("SELECT * FROM users WHERE email = $1", [email])
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password)
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user.rows[0].id, email: user.rows[0].email }, SECRET_KEY, { expiresIn: "1h" })

    const { password: _, ...userDetails } = user.rows[0]
    res.json({ token, user: userDetails })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  registerUser,
  loginUser,
}

