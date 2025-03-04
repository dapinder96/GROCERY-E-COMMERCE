const { client } = require("../config/db")

const createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body
  const image_url = req.file ? `/uploads/${req.file.filename}` : null

  try {
    const result = await client.query(
      "INSERT INTO products (name, description, price, stock, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, description, price, stock, image_url],
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

const getProducts = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM products ORDER BY created_at DESC")
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

const updateProduct = async (req, res) => {
  const { id } = req.params
  const { name, description, price, stock } = req.body
  const image_url = req.file ? `/uploads/${req.file.filename}` : undefined

  try {
    let query = "UPDATE products SET name=$1, description=$2, price=$3, stock=$4"
    const values = [name, description, price, stock]

    if (image_url) {
      query += ", image_url=$5"
      values.push(image_url)
    }

    query += " WHERE id=$" + (values.length + 1) + " RETURNING *"
    values.push(id)

    const result = await client.query(query, values)
    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    await client.query("DELETE FROM products WHERE id = $1", [id])
    res.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await client.query("SELECT COUNT(*) FROM products")
    const totalStock = await client.query("SELECT SUM(stock) FROM products")
    const lowStock = await client.query("SELECT COUNT(*) FROM products WHERE stock < 10")
    const recentProducts = await client.query("SELECT * FROM products ORDER BY created_at DESC LIMIT 5")

    res.json({
      totalProducts: totalProducts.rows[0].count,
      totalStock: totalStock.rows[0].sum,
      lowStock: lowStock.rows[0].count,
      recentProducts: recentProducts.rows,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getDashboardStats,
}

