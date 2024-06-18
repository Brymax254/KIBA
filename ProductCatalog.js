// src/components/ProductCatalog.js
import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProductService from '../services/ProductService';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    marginBottom: theme.spacing(2),
  },
}));

const ProductCatalog = ({ onAddToCart }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Product Catalog
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body1">
                  Price: ${product.price.toFixed(2)}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => onAddToCart(product)}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductCatalog;
