import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Simple email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }
  
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email.');
      return;
    }
  
    try {
      const response = await axios.post(
        'https://bh9t3o0g76.execute-api.us-east-1.amazonaws.com/deployment/login', // Replace with your actual API Gateway endpoint for login
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          validateStatus: (status) => {
            // Accept all status codes so we can handle them manually
            return true; // Accept all status codes
          },
        }
      );
  
      // Now manually check the status codes
      if (response.status === 200) {
        toast.success(response.data.message);  // Login successful
      } else if (response.status === 401 || response.status === 400) {
        toast.error(response.data.message);  // Incorrect credentials or user not found
      } else {
        toast.error('Unexpected response. Please try again.');
      }
  
    } catch (error) {
      // Handle any network-related errors or issues like timeouts
      toast.error('A network error occurred during login. Please try again.');
      console.log('Error during login:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-8 md:w-1/3 w-full">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-lg font-semibold hover:from-green-500 hover:to-blue-600 transition duration-200 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="text-gray-600 text-sm mt-4 text-center">
          Don't have an account?{' '}
          <a href="/" className="text-green-500 hover:text-green-600">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
