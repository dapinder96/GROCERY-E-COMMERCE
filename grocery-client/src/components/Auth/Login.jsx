import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';


const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:3000/api/login', { email, password });
  //     localStorage.setItem('token', response.data.token);
  //     localStorage.setItem('user', JSON.stringify(response.data.user));
  //     toast.success('Login successful!');
  //     navigate('/');
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || 'An error occurred');
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      // Use the login function from AuthContext instead of directly setting localStorage
      login(response.data.user, response.data.token);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-1/2 bg-cover bg-center" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}>
        <div className="flex flex-col justify-center h-full px-8 bg-black bg-opacity-50 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome Back to GreenStore</h1>
          <p className="text-xl">Login to access fresh, organic groceries delivered to your doorstep.</p>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            Login
          </button>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account? <Link to="/signup" className="text-green-500 hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;