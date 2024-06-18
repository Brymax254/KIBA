// src/components/CheckoutForm.js
import React, { useState } from 'react';
import { Typography, TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PaymentService from '../services/PaymentService'; // Placeholder for payment service integration

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

const CheckoutForm = ({ cartItems, totalAmount, onCompletePurchase }) => {
  const classes = useStyles();
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const paymentDetails = {
        customerName,
        paymentMethod,
        amount: totalAmount,
        items: cartItems,
      };
      const response = await PaymentService.processPayment(paymentDetails);
      onCompletePurchase(response.data);
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={classes.formContainer}>
      <Typography variant="h5" gutterBottom>
        Checkout
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Customer Name"
            variant="outlined"
            fullWidth
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className={classes.input}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            fullWidth
            className={classes.input}
            SelectProps={{
              native: true,
            }}
          >
            <option value="credit_card">Credit Card</option>
            <option value="cash">Cash</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isProcessing}
            onClick={handleCheckout}
          >
            {isProcessing ? 'Processing...' : 'Complete Purchase'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckoutForm;
