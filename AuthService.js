// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Update with your authentication API URL

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

const getToken = () => {
  return localStorage.getItem('token');
};

export default {
  login,
  logout,
  getToken,
};
