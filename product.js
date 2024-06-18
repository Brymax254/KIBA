import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProductService from '../services/ProductService'; // Assuming ProductService handles API calls

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    marginBottom: theme.spacing(2),
  },
}));

const ProductCatalog = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getProducts(); // Example service method to fetch products
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (productId) => {
    // Implement logic to add product to shopping cart
    console.log('Added product to cart:', productId);
  };

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
                  Price: ${product.price}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => addToCart(product._id)}>
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
