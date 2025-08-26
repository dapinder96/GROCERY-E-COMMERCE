
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css"
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AdminMain from './components/Admin/AdminMain';
import About from './components/About/About'

// New Components
import AllProducts from './components/Products/AllProucts';
import Cart from './components/Products/Cart';
import Payment from './components/Products/Payment';
// import Orders from './components/Orders/Orders';
import Customer from './components/customer/Customer'
import PrivateRoute from './Protected_routes/PrivateRoute';
import UserHistory from './components/UserHistory/UserHistory';
import Orders from './components/Products/Orders';
import ProductReviews from './components/Products/ProductReviews';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="products" element={<AllProducts />} />
              <Route path="userhistory" element={<UserHistory />} />
              <Route path="customer" element={<Customer />} />
              <Route path="about" element={<About />} />

              <Route path="products/:productId/reviews" element={<ProductReviews />} />

              
              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="cart" element={<Cart />} />
                <Route path="payment" element={<Payment />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Route>

            <Route path="/admin/*" element={<AdminMain />} />
          </Routes>

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;