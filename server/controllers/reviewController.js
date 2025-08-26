const { client } = require('../config/db');

const reviewController = {
  createReview: async (req, res) => {
    try {
      const { productId, rating, comment } = req.body;
      const userId = req.user.userId; 

      console.log('Received review data:', {
        userId,
        productId,
        rating,
        comment,
        user: req.user
      });

      if (!productId || !Number.isInteger(Number(productId))) {
        return res.status(400).json({ 
          message: 'Invalid product ID',
          received: { productId }
        });
      }

      if (!rating || !Number.isInteger(Number(rating)) || rating < 1 || rating > 5) {
        return res.status(400).json({ 
          message: 'Invalid rating (must be between 1 and 5)',
          received: { rating }
        });
      }

      if (!comment || typeof comment !== 'string' || comment.trim().length === 0) {
        return res.status(400).json({ 
          message: 'Comment is required',
          received: { comment }
        });
      }

      const productCheck = await client.query(
        'SELECT id FROM products WHERE id = $1',
        [productId]
      );

      if (productCheck.rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const existingReview = await client.query(
        'SELECT * FROM reviews WHERE user_id = $1 AND product_id = $2',
        [userId, productId]
      );

      if (existingReview.rows.length > 0) {
        return res.status(400).json({ message: 'You have already reviewed this product' });
      }

      const result = await client.query(
        `INSERT INTO reviews (user_id, product_id, rating, comment)
         VALUES ($1, $2, $3, $4)
         RETURNING id, rating, comment, created_at`,
        [userId, productId, rating, comment.trim()]
      );

      const userInfo = await client.query(
        'SELECT name FROM users WHERE id = $1',
        [userId]
      );

      const reviewResponse = {
        ...result.rows[0],
        user: {
          id: userId,
          name: userInfo.rows[0]?.name || 'Anonymous'
        }
      };

      res.status(201).json(reviewResponse);

    } catch (error) {
      console.error('Review creation error:', error);
      res.status(500).json({ 
        message: 'Failed to create review',
        error: error.message 
      });
    }
  },

  getProductReviews: async (req, res) => {
    try {
      const { productId } = req.params;

      if (!productId || !Number.isInteger(Number(productId))) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }

      const reviews = await client.query(
        `SELECT r.*, u.name as user_name 
         FROM reviews r 
         LEFT JOIN users u ON r.user_id = u.id 
         WHERE r.product_id = $1 
         ORDER BY r.created_at DESC`,
        [productId]
      );

      const formattedReviews = reviews.rows.map(review => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.created_at,
        user: {
          id: review.user_id,
          name: review.user_name || 'Anonymous'
        }
      }));

      res.json(formattedReviews);

    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ 
        message: 'Error fetching reviews',
        error: error.message 
      });
    }
  }
};

module.exports = reviewController;