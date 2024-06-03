import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../api';
import { Base64 } from 'js-base64';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
  });

  const [message, setMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTenant, setIsTenant] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const encodedCredentials = Base64.encode(`${formData.phoneNumber}:${formData.password}`);
      const response = await axiosInstance.post('/login', '', {
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
        }
      });
      console.log('Response:', response); // Log the response for debugging
      const token = response.data.token; // Assuming the token is returned in the response
      localStorage.setItem('token', token); // Store the token in local storage
      setMessage({ type: 'success', text: 'Login successful!' });
      setIsLoggedIn(true); // Set login state to true on success
      if (response.data.role === "owner") {
        setIsTenant(false);
      }
    } catch (error) {
      console.log('Error:', error); // Log the error for debugging
      setMessage({ type: 'error', text: 'Check credentials and retry' });
    }
  };

  // Redirect to the dashboard if logged in
  if (isLoggedIn && !isTenant) {
    return <Navigate to="/dashboard" />;
  } else if (isLoggedIn) {
    return <Navigate to="/tenant" />;
  }

  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex md:max-w-4xl">
        <div className="hidden md:block md:w-1/2">
          <img src="/hero.jpg" alt="Registration" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-8 text-purple-700 text-center">User Login</h2>
          {message && (
            <div className={`mb-4 text-center ${message.type === 'success' ? 'bg-green-100 p-2' : 'bg-red-100 p-2'}`}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
