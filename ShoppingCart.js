// src/components/ShoppingCart.js
import React from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cartContainer: {
    marginTop: theme.spacing(2),
  },
  checkoutButton: {
    marginTop: theme.spacing(2),
  },
}));

const ShoppingCart = ({ cartItems, onRemoveFromCart, onCheckout }) => {
  const classes = useStyles();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className={classes.cartContainer}>
      <Typography variant="h5" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.productId}>
            <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`} />
            <Button variant="contained" color="secondary" onClick={() => onRemoveFromCart(item.productId)}>
              Remove
            </Button>
          </ListItem>
        ))}
        <Divider />
        <ListItem>
          <ListItemText primary="Total" secondary={`$${calculateTotal().toFixed(2)}`} />
        </ListItem>
      </List>
      <Button variant="contained" color="primary" className={classes.checkoutButton} onClick={onCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default ShoppingCart;
