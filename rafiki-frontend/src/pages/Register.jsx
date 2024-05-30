// src/components/UserRegistration.js
import React, { useState } from 'react';
import axios from 'axios';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    role: 'tenant',
  });

  const [message, setMessage] = useState(null);

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
      const response = await axios.post('http://localhost:5000/api/register', {
        firstname: formData.firstName,
        lastname: formData.lastName,
        phonenumber: formData.phoneNumber,
        password: formData.password,
        role: formData.role,
      });
      setMessage({ type: 'success', text: 'Registration successful!' });
      console.log(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: "error logging in"});
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex md:max-w-4xl">
        <div className="hidden md:block md:w-1/2">
          <img src="/hero.jpg" alt="Registration" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-8 text-purple-700 text-center">User Registration</h2>
          {message && (
            <div className={`mb-4 text-center ${message.type === 'success' ? ' bg-green-100 p-2' : 'bg-red-100 p-2'}`}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
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
            <div className="mb-6">
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="tenant">Tenant</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
