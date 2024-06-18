// src/components/AdminDashboard/CustomerManagement.js
import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import ApiService from '../../services/ApiService';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await ApiService.getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleCreateCustomer = async () => {
    try {
      await ApiService.createCustomer(customer);
      fetchCustomers();
      setCustomer({ name: '', email: '', phone: '', address: '' });
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  const handleUpdateCustomer = async () => {
    try {
      await ApiService.updateCustomer(editCustomerId, customer);
      fetchCustomers();
      setCustomer({ name: '', email: '', phone: '', address: '' });
      setIsEditing(false);
      setEditCustomerId(null);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleEditCustomer = (customer) => {
    setCustomer(customer);
    setIsEditing(true);
    setEditCustomerId(customer._id);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await ApiService.deleteCustomer(id);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Customer Management</Typography>
      <TextField
        label="Name"
        name="name"
        value={customer.name}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        value={customer.email}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Phone"
        name="phone"
        value={customer.phone}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Address"
        name="address"
        value={customer.address}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={isEditing ? handleUpdateCustomer : handleCreateCustomer}
        style={{ marginTop: '20px' }}
      >
        {isEditing ? 'Update Customer' : 'Create Customer'}
      </Button>
      <List>
        {customers.map((customer) => (
          <ListItem key={customer._id}>
            <ListItemText
              primary={customer.name}
              secondary={`Email: ${customer.email} | Phone: ${customer.phone} | Address: ${customer.address}`}
            />
            <IconButton onClick={() => handleEditCustomer(customer)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteCustomer(customer._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CustomerManagement;
