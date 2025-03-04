import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, Truck, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, calculateTotal } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const TAX_RATE = 0.08; 
  const DELIVERY_FEE = 5.99;
  const DISCOUNT_PERCENTAGE = 0.10; 

  const subtotal = calculateTotal();
  const tax = subtotal * TAX_RATE;
  const discount = discountApplied ? subtotal * DISCOUNT_PERCENTAGE : 0;
  const total = subtotal + tax + DELIVERY_FEE - discount;

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to view your cart');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleQuantityChange = async (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    
    const product = cartItems.find(item => item.product_id === productId);
    if (newQuantity > product.stock) {
      toast.error('Cannot exceed available stock');
      return;
    }
    
    await updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  const handleDiscountCode = () => {
    if (discountCode.toUpperCase() === 'SAVE10') {
      setDiscountApplied(true);
      toast.success('Discount applied successfully!');
    } else {
      toast.error('Invalid discount code');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckout = () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    localStorage.setItem('shippingDetails', JSON.stringify({
      ...formData,
      subtotal,
      tax,
      discount,
      deliveryFee: DELIVERY_FEE,
      total
    }));
    
    navigate('/payment');
  };

  const validateForm = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-lg shadow-sm"
              >
                <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Your cart is empty</p>
              </motion.div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm divide-y">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.product_id}
                    layout
                    className="p-4 flex items-center"
                  >
                    <img
                      src={`http://localhost:3000${item.image_url}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-green-600 font-bold">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(item.product_id, item.quantity, -1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.product_id, item.quantity, 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.product_id)}
                        className="ml-4 p-1 text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="lg:w-96">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${DELIVERY_FEE}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      onClick={handleDiscountCode}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                    >
                      <Tag size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="2"
                      className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </form>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="mt-6 w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Truck size={20} />
                  Proceed to Payment
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;