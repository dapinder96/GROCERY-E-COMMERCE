const { client } = require("../config/db")

const addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body
  try {
    const product = await client.query("SELECT stock FROM products WHERE id = $1", [product_id])
    if (product.rows[0].stock < quantity) {
      return res.status(400).json({ message: "Not enough stock available" })
    }

    const existingItem = await client.query("SELECT * FROM carts WHERE user_id = $1 AND product_id = $2", [
      user_id,
      product_id,
    ])

    if (existingItem.rows.length > 0) {
      await client.query("UPDATE carts SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3", [
        quantity,
        user_id,
        product_id,
      ])
    } else {
      await client.query("INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3)", [
        user_id,
        product_id,
        quantity,
      ])
    }

    res.status(201).json({ message: "Added to cart" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

const getUserCart = async (req, res) => {
  try {
    const result = await client.query(
      `
      SELECT c.*, p.name, p.price, p.image_url, p.stock
      FROM carts c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1
    `,
      [req.params.userId],
    )
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

const updateCartItem = async (req, res) => {
  const { quantity } = req.body
  try {
    await client.query("UPDATE carts SET quantity = $1 WHERE user_id = $2 AND product_id = $3", [
      quantity,
      req.params.userId,
      req.params.productId,
    ])
    res.json({ message: "Cart updated" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

const removeCartItem = async (req, res) => {
  try {
    await client.query("DELETE FROM carts WHERE user_id = $1 AND product_id = $2", [
      req.params.userId,
      req.params.productId,
    ])
    res.json({ message: "Item removed from cart" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
}

