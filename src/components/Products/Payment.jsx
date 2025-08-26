

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Smartphone, 
  Wallet, 
  CheckCircle, 
  ChevronRight, 
  ShoppingBag, 
  Truck,
  Package,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const [shippingDetails, setShippingDetails] = useState(() => {
    const stored = localStorage.getItem('shippingDetails');
    if (!stored) {
      navigate('/cart');
      return {};
    }
    try {
      return JSON.parse(stored);
    } catch (error) {
      navigate('/cart');
      return {};
    }
  });

  useEffect(() => {
    if (!shippingDetails || !shippingDetails.total) {
      toast.error('Please complete your order details first');
      navigate('/cart');
    }
  }, [shippingDetails, navigate]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Razorpay SDK failed to load');
        return;
      }

      const orderData = {
        user_id: user.id,
        cart_items: cartItems,
        shipping_address: JSON.stringify(shippingDetails),
        total_amount: shippingDetails.total,
        discount_applied: shippingDetails.discount || 0,
        status: 'pending'
      };

      const options = {
        key: 'rzp_test_jnFll4vBKCwPho',
        amount: Math.round(shippingDetails.total * 100), 
        currency: 'INR',
        name: 'GreenStore',
        description: 'Purchase from GreenStore',
        handler: async function (response) {
          try {
            const orderResponse = await axios.post('http://localhost:3000/api/orders', 
              {
                ...orderData,
                payment_method: 'razorpay',
                razorpay_payment_id: response.razorpay_payment_id
              },
              {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
              }
            );

            if (orderResponse.data.orderId) {
              setOrderPlaced(true);
              await clearCart();
              localStorage.removeItem('shippingDetails');
              toast.success('Order placed successfully!');
              setTimeout(() => {
                navigate('/orders');
              }, 2000);
            }
          } catch (error) {
            toast.error('Error creating order');
            console.error('Order creation error:', error);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingDetails.phone
        },
        theme: {
          color: '#10B981'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response) {
        toast.error('Payment failed: ' + response.error.description);
      });
      razorpay.open();

    } catch (error) {
      toast.error('Error processing payment');
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mb-6 flex justify-center"
          >
            <CheckCircle className="text-green-500" size={48} />
          </motion.div>
          <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Your payment has been processed and order is confirmed.</p>
          <p className="text-gray-600 mb-6">Redirecting to orders page...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {shippingDetails && shippingDetails.total ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${shippingDetails.subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${shippingDetails.tax?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${shippingDetails.deliveryFee?.toFixed(2)}</span>
              </div>
              {shippingDetails.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${shippingDetails.discount?.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${shippingDetails.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                Pay ${shippingDetails.total?.toFixed(2)}
                <ChevronRight size={20} />
              </>
            )}
          </motion.button>
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Payment;