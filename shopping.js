import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const ShoppingCart = ({ cartItems }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.productId}>
            <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ShoppingCart;
