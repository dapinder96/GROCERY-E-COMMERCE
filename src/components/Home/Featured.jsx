
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ChevronLeft, ChevronRight, Star, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

function Featured() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const productsToShow = 3;
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data.slice(0, 6));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error fetching products');
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    if (product.stock <= 0) {
      toast.error('Product out of stock');
      return;
    }
    await addToCart(product, 1);
  };

  const nextProducts = () => {
    setStartIndex((prev) => 
      prev + productsToShow >= products.length ? 0 : prev + 1
    );
  };
  
  const prevProducts = () => {
    setStartIndex((prev) => 
      prev === 0 ? Math.max(0, products.length - productsToShow) : prev - 1
    );
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our selection of fresh, organic, and locally sourced products. 
            We carefully curate our inventory to bring you the best quality items.
          </p>
        </motion.div>
        
        <div className="max-w-md mx-auto mb-10">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 text-gray-400" />
          </div>
        </div>
        
        <div className="relative">
          <div className="flex overflow-hidden">
            <motion.div 
              className="flex gap-6"
              animate={{ x: `-${startIndex * (100 / productsToShow)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  className="min-w-[calc(100%/3-1rem)] md:min-w-[calc(100%/3-1rem)] p-4 bg-white rounded-lg shadow-md flex flex-col"
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                    <img 
                      src={`http://localhost:3000${product.image_url}`}
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    {product.stock <= 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Out of Stock
                      </div>
                    )}
                    {product.stock > 0 && product.stock < 10 && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        Low Stock: {product.stock}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-green-600">${product.price}</span>
                    <motion.button 
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock <= 0}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                        product.stock <= 0
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-green-500 hover:bg-green-600'
                      } text-white transition-colors`}
                      whileHover={{ scale: product.stock > 0 ? 1.05 : 1 }}
                      whileTap={{ scale: product.stock > 0 ? 0.95 : 1 }}
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <button 
            onClick={prevProducts}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          
          <button 
            onClick={nextProducts}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
        </div>
        
        <div className="text-center mt-10">
          <Link to="/products">
            <motion.button 
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Products
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Featured;