const razorpay = require('../config/razorpay');
const { client } = require('../config/db');
const crypto = require('crypto');

const paymentController = {
  createOrder: async (req, res) => {
    try {
      const { amount, currency = 'INR' } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ 
          success: false,
          message: 'Invalid amount' 
        });
      }

      const options = {
        amount: Math.round(amount * 100), 
        currency,
        receipt: `order_rcpt_${Date.now()}`,
        payment_capture: 1 
      };

      console.log('Creating Razorpay order with options:', options);

      const order = await razorpay.orders.create(options);
      
      console.log('Razorpay order created:', order);

      res.json({
        success: true,
        id: order.id,
        amount: order.amount,
        currency: order.currency
      });
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error creating order',
        error: error.message 
      });
    }
  },

  verifyPayment: async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderData
      } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderData) {
        return res.status(400).json({
          success: false,
          message: 'Missing required payment information'
        });
      }

      console.log('Verifying payment with data:', {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        userId: req.user.userId
      });

      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", "rj1C0dsKibu56PiiOhUqdGFp")
        .update(sign.toString())
        .digest("hex");

      if (razorpay_signature === expectedSign) {
        await client.query('BEGIN');

        try {
          const payment = await razorpay.payments.fetch(razorpay_payment_id);
          
          if (payment.status !== 'captured') {
            throw new Error('Payment not captured');
          }

          const orderResult = await client.query(
            `INSERT INTO orders (
              user_id, 
              total_amount, 
              shipping_address, 
              payment_method,
              payment_id,
              order_id,
              status,
              discount_applied,
              created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP) 
            RETURNING id, created_at`,
            [
              req.user.userId,
              orderData.total_amount,
              orderData.shipping_address,
              'razorpay',
              razorpay_payment_id,
              razorpay_order_id,
              'confirmed',
              orderData.discount_applied || 0
            ]
          );

          const orderId = orderResult.rows[0].id;

          for (const item of orderData.cart_items) {
            const stockCheck = await client.query(
              'SELECT stock FROM products WHERE id = $1 FOR UPDATE',
              [item.product_id]
            );

            if (stockCheck.rows.length === 0) {
              throw new Error(`Product ${item.product_id} not found`);
            }

            const currentStock = stockCheck.rows[0].stock;
            if (currentStock < item.quantity) {
              throw new Error(`Insufficient stock for product ${item.product_id}`);
            }

            await client.query(
              `INSERT INTO order_items (
                order_id, 
                product_id, 
                quantity, 
                price_at_time
              ) VALUES ($1, $2, $3, $4)`,
              [orderId, item.product_id, item.quantity, item.price]
            );

            await client.query(
              `UPDATE products 
               SET stock = stock - $1 
               WHERE id = $2`,
              [item.quantity, item.product_id]
            );
          }

          await client.query(
            'DELETE FROM carts WHERE user_id = $1',
            [req.user.userId]
          );

          await client.query('COMMIT');

          console.log('Order created successfully:', orderId);

          res.json({ 
            success: true, 
            orderId,
            message: 'Payment verified and order created successfully',
            created_at: orderResult.rows[0].created_at
          });

        } catch (error) {
          await client.query('ROLLBACK');
          throw error;
        }
      } else {
        console.error('Payment signature verification failed');
        res.status(400).json({ 
          success: false, 
          message: 'Payment verification failed' 
        });
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      
      try {
        await client.query('ROLLBACK');
      } catch (rollbackError) {
        console.error('Error rolling back transaction:', rollbackError);
      }

      res.status(500).json({ 
        success: false, 
        message: error.message || 'Error processing payment',
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  },

  getPaymentStatus: async (req, res) => {
    try {
      const { paymentId } = req.params;
      
      if (!paymentId) {
        return res.status(400).json({
          success: false,
          message: 'Payment ID is required'
        });
      }

      const payment = await razorpay.payments.fetch(paymentId);
      
      res.json({
        success: true,
        status: payment.status,
        details: payment
      });
    } catch (error) {
      console.error('Error fetching payment status:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching payment status',
        error: error.message
      });
    }
  },

  refundPayment: async (req, res) => {
    try {
      const { paymentId, amount } = req.body;

      if (!paymentId) {
        return res.status(400).json({
          success: false,
          message: 'Payment ID is required'
        });
      }

      const refund = await razorpay.payments.refund(paymentId, {
        amount: amount ? Math.round(amount * 100) : undefined
      });

      res.json({
        success: true,
        refund: refund
      });
    } catch (error) {
      console.error('Error processing refund:', error);
      res.status(500).json({
        success: false,
        message: 'Error processing refund',
        error: error.message
      });
    }
  }
};

module.exports = paymentController;