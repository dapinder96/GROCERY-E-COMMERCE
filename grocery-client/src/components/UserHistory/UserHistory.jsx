import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Search, 
  Filter, 
  Package, 
  Clock, 
  Calendar,
  DollarSign,
  ShoppingBag,
  Truck,
  CheckCircle,
  XCircle
} from 'lucide-react';

const UserHistory = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [dateSort, setDateSort] = useState('desc');
  const [error, setError] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'processing': return <Package className="w-5 h-5" />;
      case 'shipped': return <Truck className="w-5 h-5" />;
      case 'delivered': return <CheckCircle className="w-5 h-5" />;
      case 'cancelled': return <XCircle className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const fetchUserOrders = async () => {
    if (!user?.email) {
      setLoading(false);
      setError('User email not found');
      return;
    }

    try {
      console.log('Fetching orders for:', user.email);
      const response = await axios.get('/api/user-history', {
        params: { email: user.email },
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log('API Response:', response.data);

      if (!response.data) {
        throw new Error('No data received from server');
      }

      const orderData = Array.isArray(response.data) ? response.data : [];
      console.log('Parsed order data:', orderData);

      if (orderData.length === 0) {
        console.log('No orders found for user');
        setError('No orders found');
        setOrders([]);
        setFilteredOrders([]);
        return;
      }

      const formattedOrders = orderData.map(order => ({
        _id: order.id,
        orderId: order.orderId || String(order.id),
        status: order.status || 'pending',
        createdAt: order.created_at || order.createdAt,
        total: parseFloat(order.total_amount || order.total) || 0,
        shippingAddress: order.shipping_address || order.shippingAddress,
        paymentMethod: order.payment_method || order.paymentMethod,
        items: Array.isArray(order.items) ? order.items.filter(item => item !== null) : [],
        statusUpdates: [{
          status: order.status || 'pending',
          timestamp: order.created_at || order.createdAt
        }]
      }));

      console.log('Formatted orders:', formattedOrders);
      setOrders(formattedOrders);
      setFilteredOrders(formattedOrders);
      setError(null);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error.response?.data?.message || 'Failed to load orders');
      setOrders([]);
      setFilteredOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      fetchUserOrders();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (!Array.isArray(orders)) {
      setFilteredOrders([]);
      return;
    }

    let filtered = orders.filter(order => {
      const matchesSearch = order.orderId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(order.items) && order.items.some(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateSort === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders, dateSort]);

  if (!isAuthenticated) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center h-[60vh] text-lg text-gray-600"
      >
        Please login to view your order history.
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 max-w-7xl"
    >
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Order History</h2>
      
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <p>Debug Info:</p>
          <p>User Email: {user?.email}</p>
          <p>Orders Count: {orders.length}</p>
          <p>Filtered Orders Count: {filteredOrders.length}</p>
          <p>Error: {error}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button
            onClick={() => setDateSort(prev => prev === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Calendar className="w-5 h-5" />
            {dateSort === 'desc' ? 'Newest' : 'Oldest'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {!Array.isArray(filteredOrders) || filteredOrders.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500 mt-8"
          >
            {error || 'No orders found.'}
          </motion.p>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map((order) => (
              <motion.div
                key={order._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Package className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-semibold">Order #{order.orderId}</h3>
                    </div>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </span>
                      <span className={`
                        inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm
                        ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-primary/10 text-primary'}
                      `}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-5 h-5" />
                      <span className="font-medium">Total: ${order.total.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Items
                      </h4>
                      <div className="grid gap-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-600">{item.name}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-500">x{item.quantity}</span>
                              <span className="font-medium">${item.price.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="font-medium mb-3">Status Timeline</h4>
                      <div className="space-y-3">
                        {order.statusUpdates.map((update, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="relative flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                              {index !== order.statusUpdates.length - 1 && (
                                <div className="absolute top-2 w-px h-full bg-gray-200"></div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{update.status}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(update.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserHistory;