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
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const [walletBalance, setWalletBalance] = useState(1000);
  
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

  const handleCardInput = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePaymentDetails = () => {
    switch (paymentMethod) {
      case 'card':
        return Object.values(cardDetails).every(val => val.trim() !== '');
      case 'upi':
        return upiId.includes('@');
      case 'wallet':
        return walletBalance >= shippingDetails.total;
      default:
        return false;
    }
  };

  const simulateOrderStatus = async (orderId) => {
    const statuses = ['accepted', 'processing', 'dispatched', 'delivered'];
    for (const status of statuses) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setOrderStatus(status);
      
      try {
        await axios.put(`http://localhost:3000/api/orders/${orderId}/status`, {
          status
        });
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }
  };

  const handlePayment = async () => {
    if (!validatePaymentDetails()) {
      toast.error('Please fill in all payment details correctly');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        user_id: user.id,
        cart_items: cartItems,
        shipping_address: JSON.stringify(shippingDetails),
        payment_method: paymentMethod,
        total_amount: shippingDetails.total,
        discount_applied: shippingDetails.discount || 0,
        status: 'pending'
      };

      const response = await axios.post('http://localhost:3000/api/orders', orderData);

      if (response.data.orderId) {
        setOrderPlaced(true);
        await clearCart();
        localStorage.removeItem('shippingDetails');
        toast.success('Order placed successfully! Status: Pending');

      }
    } catch (error) {
      toast.error('Error processing payment');
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
            <Clock className="text-yellow-500" size={48} />
          </motion.div>
          <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-2">Your order is pending confirmation.</p>
          <p className="text-gray-600 mb-6">We will notify you once it's confirmed.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/orders')}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            View Orders
          </motion.button>
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

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-lg border ${
                  paymentMethod === 'card' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200'
                } flex flex-col items-center gap-2`}
              >
                <CreditCard size={24} />
                <span>Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-lg border ${
                  paymentMethod === 'upi' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200'
                } flex flex-col items-center gap-2`}
              >
                <Smartphone size={24} />
                <span>UPI</span>
              </button>
              <button
                onClick={() => setPaymentMethod('wallet')}
                className={`p-4 rounded-lg border ${
                  paymentMethod === 'wallet' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200'
                } flex flex-col items-center gap-2`}
              >
                <Wallet size={24} />
                <span>Wallet</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={paymentMethod}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input
                        type="text"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleCardInput}
                        placeholder="1234 5678 9012 3456"
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleCardInput}
                          placeholder="MM/YY"
                          className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardInput}
                          placeholder="123"
                          className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Holder Name</label>
                      <input
                        type="text"
                        name="name"
                        value={cardDetails.name}
                        onChange={handleCardInput}
                        placeholder="John Doe"
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@upi"
                      className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Wallet Balance</span>
                      <span className="text-xl font-bold">${walletBalance.toFixed(2)}</span>
                    </div>
                    {walletBalance < shippingDetails.total && (
                      <p className="text-red-500 text-sm">Insufficient balance</p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              disabled={loading}
              className="mt-6 w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
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
          </div>
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