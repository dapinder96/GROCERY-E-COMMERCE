import React, { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, ChevronLeft, ChevronRight, Star, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const { user, isAuthenticated, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate('/login');
    };

    // Calculate total items in cart
    const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
      <>
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-green-500 z-50"
          style={{ scaleX: scrollYProgress }}
        />
         
        <nav className="sticky top-0 bg-white shadow-md z-40">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-green-600 flex items-center"
              >
                <div className="w-10 h-10 bg-green-600 rounded-full mr-2 flex items-center justify-center text-white">
                  Gk
                </div>
                GrocKart
              </motion.div>
              
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors">Home</Link>
                <Link to="/products" className="text-gray-700 hover:text-green-600 transition-colors">Shop</Link>
                <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors">About</Link>
                <Link to="/orders" className="text-gray-700 hover:text-green-600 transition-colors">Orders</Link>
                <Link to="/customer" className="text-gray-700 hover:text-green-600 transition-colors">Customer Care</Link>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <span className="text-gray-700">Hi, {user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <button className="px-4 py-2 text-gray-700 hover:text-green-600 transition-colors">Login</button>
                    </Link>
                    <Link to="/signup">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Sign Up</button>
                    </Link>
                  </>
                )}
                <Link to="/cart">
                  <div className="relative">
                    <ShoppingCart className="text-gray-700 hover:text-green-600 transition-colors" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
              
              <div className="md:hidden flex items-center">
                <div className="relative mr-4">
                  <Link to="/cart">
                    <ShoppingCart className="text-gray-700" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                </div>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white"
              >
                <div className="flex flex-col space-y-3 px-4 py-4">
                  <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors py-2 border-b border-gray-100">Home</Link>
                  <Link to="/products" className="text-gray-700 hover:text-green-600 transition-colors py-2 border-b border-gray-100">Shop</Link>
                  <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors py-2 border-b border-gray-100">About</Link>
                  <Link to="/orders" className="text-gray-700 hover:text-green-600 transition-colors py-2 border-b border-gray-100">Orders</Link>
                  <Link to="/customer" className="text-gray-700 hover:text-green-600 transition-colors py-2 border-b border-gray-100">Customer</Link>
                  <div className="flex space-x-2 pt-2">
                    {isAuthenticated ? (
                      <>
                        <span className="text-gray-700 py-2">Hi, {user.name}</span>
                        <button
                          onClick={handleLogout}
                          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="flex-1">
                          <button className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">Login</button>
                        </Link>
                        <Link to="/signup" className="flex-1">
                          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Sign Up</button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </>
    );
}

export default Navbar;