// src/services/PaymentService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/payments'; // Update with your back-end API URL

const processPayment = async (paymentDetails) => {
  try {
    const response = await axios.post(API_URL, paymentDetails);
    return response;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

export default { processPayment };
