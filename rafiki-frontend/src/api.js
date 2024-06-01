import axios from 'axios';

// Create an instance of axios with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Set your base URL here
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
