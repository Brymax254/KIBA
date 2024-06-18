// src/services/ApiService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const login = (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};

const getProducts = () => {
  return axios.get(`${API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const createProduct = (product) => {
  return axios.post(`${API_URL}/products`, product, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

// ... (other methods remain unchanged)

export default {
  login,
  getProducts,
  createProduct,
  // ... (other methods remain unchanged)
};
