const { client } = require("../config/db")


const getOrderStats = async (req, res) => {
    try {
      const [statusStats, monthlyRevenue] = await Promise.all([
        client.query(`
          SELECT status, COUNT(*) as count
          FROM orders
          GROUP BY status
        `),
        client.query(`
          SELECT 
            DATE_TRUNC('month', created_at) as month,
            SUM(total_amount) as revenue,
            COUNT(*) as order_count
          FROM orders
          WHERE created_at >= NOW() - INTERVAL '6 months'
          GROUP BY month
          ORDER BY month DESC
        `),
      ])
  
      res.json({
        statusStats: statusStats.rows,
        monthlyRevenue: monthlyRevenue.rows,
      })
    } catch (error) {
      console.error("Error fetching order statistics:", error)
      res.status(500).json({ message: "Server error" })
    }
  }

const createOrder = async (req, res) => {
  const { user_id, cart_items, shipping_address, payment_method, total_amount, discount_applied } = req.body

  try {
    await client.query("BEGIN")

    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount, shipping_address, payment_method, discount_applied)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [user_id, total_amount, shipping_address, payment_method, discount_applied],
    )

    const orderId = orderResult.rows[0].id

    for (const item of cart_items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_time)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, item.price],
      )

      await client.query("UPDATE products SET stock = stock - $1 WHERE id = $2", [item.quantity, item.product_id])
    }

    await client.query("DELETE FROM carts WHERE user_id = $1", [user_id])

    await client.query("COMMIT")

    res.status(201).json({
      message: "Order placed successfully",
      orderId,
    })
  } catch (error) {
    await client.query("ROLLBACK")
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

const getUserOrders = async (req, res) => {
  try {
    const result = await client.query(
      `
      SELECT o.*, oi.quantity, p.name, p.image_url
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC
    `,
      [req.params.userId],
    )
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params
  const { status } = req.body

  try {
    const result = await client.query("UPDATE orders SET status = $1 WHERE id = $2 RETURNING *", [status, orderId])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error("Error updating order status:", error)
    res.status(500).json({ message: "Server error" })
  }
}

const getOrderDetails = async (req, res) => {
  const { orderId } = req.params

  if (orderId === "analytics" || orderId === "stats") {
    return res.status(404).json({ message: "Invalid route" })
  }

  if (isNaN(orderId)) {
    return res.status(400).json({ message: "Invalid order ID" })
  }

  try {
    const query = `
      SELECT 
        o.*,
        u.name as user_name,
        u.email as user_email,
        u.phone as user_phone,
        (
          SELECT json_agg(
            json_build_object(
              'id', p.id,
              'name', p.name,
              'price', oi.price_at_time,
              'quantity', oi.quantity
            )
          )
          FROM order_items oi
          JOIN products p ON oi.product_id = p.id
          WHERE oi.order_id = o.id
        ) as items
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.id = $1
    `

    const result = await client.query(query, [orderId])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error("Error fetching order:", error)
    res.status(500).json({ message: "Server error" })
  }
}

const deleteOrder = async (req, res) => {
  const { orderId } = req.params

  try {
    await client.query("BEGIN")

    await client.query("DELETE FROM order_items WHERE order_id = $1", [orderId])

    const result = await client.query("DELETE FROM orders WHERE id = $1 RETURNING *", [orderId])

    if (result.rows.length === 0) {
      await client.query("ROLLBACK")
      return res.status(404).json({ message: "Order not found" })
    }

    await client.query("COMMIT")
    res.json({ message: "Order deleted successfully" })
  } catch (error) {
    await client.query("ROLLBACK")
    console.error("Error deleting order:", error)
    res.status(500).json({ message: "Server error" })
  }
}



const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query
    const offset = (page - 1) * limit

    let query = `
      SELECT 
        o.*,
        u.name as user_name,
        u.email as user_email,
        u.phone as user_phone,
        oi.items
      FROM orders o
      JOIN users u ON o.user_id = u.id
      LEFT JOIN (
        SELECT 
          order_id,
          json_agg(
            json_build_object(
              'id', p.id,
              'name', p.name,
              'price', oi.price_at_time,
              'quantity', oi.quantity
            )
          ) as items
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        GROUP BY order_id
      ) oi ON o.id = oi.order_id
    `

    let countQuery = "SELECT COUNT(*) FROM orders o JOIN users u ON o.user_id = u.id"
    const whereConditions = []
    const params = []

    if (status && status !== "all") {
      whereConditions.push("o.status = $" + (params.length + 1))
      params.push(status)
    }

    if (search) {
      whereConditions.push(`(
        LOWER(u.name) LIKE LOWER($${params.length + 1}) OR
        LOWER(u.email) LIKE LOWER($${params.length + 1}) OR
        CAST(o.id as TEXT) LIKE $${params.length + 1}
      )`)
      params.push(`%${search}%`)
    }

    if (whereConditions.length > 0) {
      const whereClause = "WHERE " + whereConditions.join(" AND ")
      query += " " + whereClause
      countQuery += " " + whereClause
    }

    query += ` ORDER BY o.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(limit, offset)

    const [orders, countResult] = await Promise.all([
      client.query(query, params),
      client.query(countQuery, params.slice(0, -2)),
    ])

    const totalOrders = Number.parseInt(countResult.rows[0].count)
    const totalPages = Math.ceil(totalOrders / limit)

    res.json({
      orders: orders.rows,
      totalPages,
      currentPage: Number.parseInt(page),
      totalOrders,
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    res.status(500).json({ message: "Server error" })
  }
}

const getOrderAnalytics = async (req, res) => {
  try {
    const revenueQuery = `
      SELECT 
        TO_CHAR(DATE_TRUNC('month', created_at), 'Mon YYYY') as month,
        COALESCE(SUM(total_amount), 0) as total
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', created_at), TO_CHAR(DATE_TRUNC('month', created_at), 'Mon YYYY')
      ORDER BY DATE_TRUNC('month', created_at) ASC
    `

    const statusQuery = `
      SELECT 
        COALESCE(status, 'pending') as status,
        COUNT(*) as count
      FROM orders
      GROUP BY status
    `

    const statsQuery = `
      SELECT 
        COUNT(*) as total_orders,
        COALESCE(SUM(total_amount), 0) as total_revenue,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
        COUNT(CASE WHEN status = 'processing' THEN 1 END) as processing_count,
        COUNT(CASE WHEN status = 'delivered' THEN 1 END) as delivered_count
      FROM orders
    `

    const [revenueResult, statusResult, statsResult] = await Promise.all([
      client.query(revenueQuery),
      client.query(statusQuery),
      client.query(statsQuery),
    ])

    const response = {
      monthlyRevenue: revenueResult.rows.map((row) => ({
        month: row.month,
        total: Number.parseFloat(row.total),
      })),
      statusDistribution: statusResult.rows.reduce((acc, row) => {
        acc[row.status] = Number.parseInt(row.count)
        return acc
      }, {}),
      totalOrders: Number.parseInt(statsResult.rows[0].total_orders),
      totalRevenue: Number.parseFloat(statsResult.rows[0].total_revenue),
      pendingOrders: Number.parseInt(statsResult.rows[0].pending_count),
      processingOrders: Number.parseInt(statsResult.rows[0].processing_count),
      deliveredOrders: Number.parseInt(statsResult.rows[0].delivered_count),
    }

    res.json(response)
  } catch (error) {
    console.error("Analytics Error:", error)
    res.status(500).json({
      message: "Error fetching analytics data",
      error: error.message,
    })
  }
}

const getUserOrderHistory = async (req, res) => {
    try {
      const userEmail = req.query.email;
      console.log('Fetching orders for email:', userEmail); 
  
      const userResult = await client.query(
        `SELECT id FROM users WHERE email = $1`,
        [userEmail]
      );
  
      console.log('User query result:', userResult.rows);
  
      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const userId = userResult.rows[0].id;
      console.log('Found user ID:', userId); 
  
      const orderCheckResult = await client.query(
        `SELECT COUNT(*) FROM orders WHERE user_id = $1`,
        [userId]
      );
      console.log('Order count:', orderCheckResult.rows[0].count); 
  
      const result = await client.query(
        `
        SELECT 
          o.*,
          json_agg(
            json_build_object(
              'name', p.name,
              'quantity', oi.quantity,
              'price', oi.price_at_time
            )
          ) FILTER (WHERE p.id IS NOT NULL) as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE o.user_id = $1
        GROUP BY o.id
        ORDER BY o.created_at DESC
        `,
        [userId]
      );
  
      console.log('Raw query result:', result.rows); 
  
      if (result.rows.length === 0) {
        return res.json([]);
      }
  
      const formattedOrders = result.rows.map(order => ({
        id: order.id,
        orderId: order.id.toString(),
        status: order.status || 'pending',
        created_at: order.created_at,
        total_amount: parseFloat(order.total_amount),
        shipping_address: order.shipping_address,
        payment_method: order.payment_method,
        items: Array.isArray(order.items) ? order.items.filter(Boolean) : [],
        status_updates: [{
          status: order.status || 'pending',
          timestamp: order.created_at
        }]
      }));
  
      console.log('Formatted orders:', formattedOrders); 
      res.json(formattedOrders);
    } catch (error) {
      console.error('Error in getUserOrderHistory:', error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
module.exports = {
  createOrder,
  getUserOrderHistory,
  getUserOrders,
  updateOrderStatus,
  getOrderDetails,
  deleteOrder,
  getOrderStats,
  getAllOrders,
  getOrderAnalytics,
}

