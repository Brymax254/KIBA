// src/components/AdminDashboard/ProductManagement.js
import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import ApiService from '../../services/ApiService';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: '', price: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await ApiService.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCreateProduct = async () => {
    try {
      await ApiService.createProduct(product);
      fetchProducts();
      setProduct({ name: '', price: '', description: '' });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await ApiService.updateProduct(editProductId, product);
      fetchProducts();
      setProduct({ name: '', price: '', description: '' });
      setIsEditing(false);
      setEditProductId(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setProduct(product);
    setIsEditing(true);
    setEditProductId(product._id);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await ApiService.deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Product Management</Typography>
      <TextField
        label="Name"
        name="name"
        value={product.name}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Price"
        name="price"
        value={product.price}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={product.description}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={isEditing ? handleUpdateProduct : handleCreateProduct}
        style={{ marginTop: '20px' }}
      >
        {isEditing ? 'Update Product' : 'Create Product'}
      </Button>
      <List>
        {products.map((product) => (
          <ListItem key={product._id}>
            <ListItemText primary={product.name} secondary={`Price: ${product.price} | ${product.description}`} />
            <IconButton onClick={() => handleEditProduct(product)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteProduct(product._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ProductManagement;
