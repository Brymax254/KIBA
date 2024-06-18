// src/services/AdminService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin'; // Update with your back-end API URL

const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const createProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/products`, product);
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

const updateProduct = async (product) => {
  try {
    const response = await axios.put(`${API_URL}/products/${product._id}`, product);
    return response;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${productId}`);
    return response;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/customers`);
    return response;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

const createCustomer = async (customer) => {
  try {
    const response = await axios.post(`${API_URL}/customers`, customer);
    return response;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

const updateCustomer = async (customer) => {
  try {
    const response = await axios.put(`${API_URL}/customers/${customer._id}`, customer);
    return response;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

const deleteCustomer = async (customerId) => {
  try {
    const response = await axios.delete(`${API_URL}/customers/${customerId}`);
    return response;
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};

const generateReport = async (reportType) => {
  try {
    const response = await axios.get(`${API_URL}/reports/${reportType}`);
    return response;
  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  generateReport,
};
