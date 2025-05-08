import { Box, Typography, Paper } from '@mui/material';

const ProductDetails = () => {
  const product = {
    id: 1,
    name: 'Apples',
    quantity: 20,
    price: 50,
    description: 'Fresh apples from the farm.',
  };

  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Product Details
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6">{product.name}</Typography>
        <Typography>Quantity: {product.quantity}</Typography>
        <Typography>Price: ₹{product.price}</Typography>
        <Typography>Description: {product.description}</Typography>
      </Paper>
    </Box>
  );
};

export default ProductDetails;
