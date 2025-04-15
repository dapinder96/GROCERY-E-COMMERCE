import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  X,
  Package,
  Clock
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

Modal.setAppElement('#root');

const TrackOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState({
    monthlyRevenue: [],
    statusDistribution: {},
    totalRevenue: 0,
    totalOrders: 0
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ordersRes, analyticsRes] = await Promise.all([
        axios.get(`http://localhost:3000/api/orders`, {
          params: {
            page: currentPage,
            limit: 10,
            status: statusFilter !== 'all' ? statusFilter : undefined,
            search: searchTerm || undefined
          }
        }),
        axios.get('http://localhost:3000/api/orders/analytics')
      ]);

      setOrders(ordersRes.data.orders);
      setTotalPages(ordersRes.data.totalPages);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, statusFilter, searchTerm]);

  const revenueChartData = {
    labels: analytics.monthlyRevenue.map(item => item.month),
    datasets: [{
      label: 'Monthly Revenue',
      data: analytics.monthlyRevenue.map(item => item.total),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const statusChartData = {
    labels: Object.keys(analytics.statusDistribution),
    datasets: [{
      data: Object.values(analytics.statusDistribution),
      backgroundColor: [
        '#FCD34D', 
        '#60A5FA', 
        '#34D399', 
        '#F87171', 
        '#A78BFA'  
      ]
    }]
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/orders/${orderId}/status`, {
        status: newStatus
      });
      toast.success('Order status updated successfully');
      fetchData();
    } catch (error) {
      toast.error('Error updating order status');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;

    try {
      await axios.delete(`http://localhost:3000/api/orders/${orderId}`);
      toast.success('Order deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Error deleting order');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
          <div className="h-64">
            <Line data={revenueChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Order Status Distribution</h3>
          <div className="h-64">
            <Pie data={statusChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Total Orders</h3>
          <p className="text-2xl font-semibold">{analytics.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Total Revenue</h3>
          <p className="text-2xl font-semibold">${analytics.totalRevenue?.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Pending Orders</h3>
          <p className="text-2xl font-semibold text-yellow-500">
            {analytics.statusDistribution?.pending || 0}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm">Delivered Orders</h3>
          <p className="text-2xl font-semibold text-green-500">
            {analytics.statusDistribution?.delivered || 0}
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">Loading...</td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">No orders found</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.user_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${order.total_amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          <ChevronLeft size={20} />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <Modal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full mx-4"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50"
>
  {selectedOrder && (
    <div className="max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Order Details #{selectedOrder.id}</h2>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Order Status</h3>
        <div className={`inline-block px-3 py-1 rounded-full ${
          selectedOrder.status === 'delivered' ? 'bg-green-100 text-green-800' :
          selectedOrder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          selectedOrder.status === 'processing' ? 'bg-blue-100 text-blue-800' :
          selectedOrder.status === 'cancelled' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-medium mb-2">Customer Information</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-2"><span className="font-medium">Name:</span> {selectedOrder.user_name}</p>
            <p className="mb-2"><span className="font-medium">Email:</span> {selectedOrder.user_email}</p>
            <p><span className="font-medium">Phone:</span> {selectedOrder.user_phone || 'N/A'}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Shipping Address</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="whitespace-pre-wrap">
              {selectedOrder.shipping_address ? 
                (typeof selectedOrder.shipping_address === 'string' ? 
                  JSON.parse(selectedOrder.shipping_address).address : 
                  selectedOrder.shipping_address.address) 
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Order Items</h3>
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {selectedOrder.items && selectedOrder.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">${item.price}</td>
                  <td className="px-4 py-2">${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Order Summary</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${selectedOrder.total_amount}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax:</span>
            <span>${(selectedOrder.total_amount * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium text-lg pt-2 border-t">
            <span>Total:</span>
            <span>${selectedOrder.total_amount}</span>
          </div>
        </div>
      </div>
    </div>
  )}
</Modal>
    </div>
  );
};

export default TrackOrders;