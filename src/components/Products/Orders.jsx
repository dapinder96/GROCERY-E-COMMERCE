import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, Truck, CheckCircle, AlertCircle, Search, Filter, ChevronDown, MapPin, Phone, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [user?.id]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/orders/${user.id}`);
      const processedOrders = response.data.map(order => ({
        ...order,
        total_amount: parseFloat(order.total_amount) || 0,
        discount_applied: parseFloat(order.discount_applied) || 0
      }));
      setOrders(processedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders');
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const formatShippingAddress = (addressString) => {
    try {
      const address = typeof addressString === 'string' ? JSON.parse(addressString) : addressString;
      return {
        name: address.name || '',
        email: address.email || '',
        phone: address.phone || '',
        address: address.address || '',
        city: address.city || '',
        state: address.state || '',
        zipCode: address.zipCode || '',
        subtotal: address.subtotal || 0,
        tax: address.tax || 0,
        discount: address.discount || 0,
        deliveryFee: address.deliveryFee || 0,
        total: address.total || 0
      };
    } catch (error) {
      console.error('Error parsing shipping address:', error);
      return null;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'processing': return <Package className="w-6 h-6 text-blue-500" />;
      case 'dispatched': return <Truck className="w-6 h-6 text-purple-500" />;
      case 'delivered': return <CheckCircle className="w-6 h-6 text-green-500" />;
      default: return <AlertCircle className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'dispatched': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterOrders = (orders) => {
    return orders.filter(order => {
      const matchesOrderId = order.id.toString().includes(searchTerm.toLowerCase());
      const matchesProductName = order.name && order.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      const orderDate = new Date(order.created_at);
      const now = new Date();
      let matchesDate = true;
      
      switch(dateFilter) {
        case 'last7days':
          matchesDate = (now - orderDate) <= 7 * 24 * 60 * 60 * 1000;
          break;
        case 'last30days':
          matchesDate = (now - orderDate) <= 30 * 24 * 60 * 60 * 1000;
          break;
        case 'last3months':
          matchesDate = (now - orderDate) <= 90 * 24 * 60 * 60 * 1000;
          break;
        default:
          matchesDate = true;
      }

      return (matchesOrderId || matchesProductName) && matchesStatus && matchesDate;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const filteredOrders = filterOrders(orders);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        <p className="text-gray-600 mt-2">Track and manage your orders</p>
      </div>

      <div className="mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search orders by ID or items..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter size={20} />
              Filters
              <ChevronDown size={16} />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Time</option>
                    <option value="last7days">Last 7 Days</option>
                    <option value="last30days">Last 30 Days</option>
                    <option value="last3months">Last 3 Months</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-white rounded-lg shadow-sm"
        >
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">No orders found</p>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const shippingAddress = formatShippingAddress(order.shipping_address);

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Order ID: #{order.id}</p>
                      <p className="text-sm text-gray-600">
                        Placed on: {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status || 'pending'}</span>
                    </div>
                  </div>

                  <div className="border-t border-b border-gray-100 py-4 mb-4">
                    <div className="flex justify-between items-center mb-2 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                      <div className="flex items-center gap-4">
                        <img 
                          src={order.image_url} 
                          alt={order.name} 
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{order.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-600">Payment Method: {order.payment_method}</p>
                      {order.discount_applied > 0 && (
                        <p className="text-sm text-green-600">
                          Discount Applied: ${order.discount_applied.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Amount:</p>
                      <p className="text-xl font-bold text-green-600">${order.total_amount.toFixed(2)}</p>
                    </div>
                  </div>

                  {shippingAddress && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h3 className="text-lg font-semibold mb-3">Delivery Details</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="font-medium">{shippingAddress.name}</p>
                            <p className="text-sm text-gray-600">
                              {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-5 h-5 text-gray-500" />
                          <p className="text-sm text-gray-600">{shippingAddress.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-5 h-5 text-gray-500" />
                          <p className="text-sm text-gray-600">{shippingAddress.email}</p>
                        </div>
                        <div className="border-t border-gray-200 pt-3 mt-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal:</span>
                            <span>${shippingAddress.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tax:</span>
                            <span>${shippingAddress.tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Delivery Fee:</span>
                            <span>${shippingAddress.deliveryFee.toFixed(2)}</span>
                          </div>
                          {shippingAddress.discount > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                              <span>Discount:</span>
                              <span>-${shippingAddress.discount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-gray-200">
                            <span>Total:</span>
                            <span>${shippingAddress.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Orders;