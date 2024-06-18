// src/services/ProductService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products'; // Update with your back-end API URL

const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export default { getProducts };
