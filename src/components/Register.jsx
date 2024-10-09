import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }
  
    try {
      const response = await axios.post(
        'https://7spbt6de3f.execute-api.us-east-1.amazonaws.com/deployment/register',
        {
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      // console.log(response);
  
      // Check if the status is 2xx (successful)
      if (response.status === 200) {
        const { statusCode, body } = response.data;
  
        toast.success("successfully registered");
      } else {
        toast.error('Unexpected response from the server. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(
          error.response.data.message || 'Registration failed. Please try again.'
        );
        console.log('Server response:', error.response);
      } else if (error.request) {
        // Request was made but no response received
        toast.error('No response from the server. Please try again.');
        console.log('No response received:', error.request);
      } else {
        // Something else happened while making the request
        toast.error('An unexpected error occurred. Please try again.');
        console.log('Error', error.message);
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-8 md:w-1/3 w-full">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Register
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
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
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
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
            Register
          </button>
        </form>
        <p className="text-gray-600 text-sm mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-green-500 hover:text-green-600">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
