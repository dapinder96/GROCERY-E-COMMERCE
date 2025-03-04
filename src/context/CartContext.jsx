import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/cart/${user.id}`);
      setCartItems(response.data);
    } catch (error) {
      toast.error('Error fetching cart items');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/cart', {
        user_id: user.id,
        product_id: product.id,
        quantity
      });
      toast.success('Added to cart');
      fetchCartItems();
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error adding to cart');
      }
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await axios.put(`http://localhost:3000/api/cart/${user.id}/${productId}`, {
        quantity
      });
      fetchCartItems();
    } catch (error) {
      toast.error('Error updating quantity');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${user.id}/${productId}`);
      toast.success('Item removed from cart');
      fetchCartItems();
    } catch (error) {
      toast.error('Error removing item');
    }
  };

  const clearCart = async () => {
    try {
      await Promise.all(cartItems.map(item => 
        axios.delete(`http://localhost:3000/api/cart/${user.id}/${item.product_id}`)
      ));
      setCartItems([]);
    } catch (error) {
      toast.error('Error clearing cart');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const applyDiscount = (total, code) => {
    if (code === 'SAVE10') {
      return total * 0.9; // 10% discount
    }
    return total;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      loading,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      calculateTotal,
      applyDiscount,
      fetchCartItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};