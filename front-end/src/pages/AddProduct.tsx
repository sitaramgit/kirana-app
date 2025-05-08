import { Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';

const AddProduct = () => {
  const [product, setProduct] = useState({ name: '', quantity: '', price: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Product Submitted:', product);
  };

  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add Product
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Product Name" name="name" value={product.name} onChange={handleChange} fullWidth />
        <TextField label="Quantity" name="quantity" type="number" value={product.quantity} onChange={handleChange} fullWidth />
        <TextField label="Price" name="price" type="number" value={product.price} onChange={handleChange} fullWidth />
        <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: 'rgb(103, 58, 183)' }}>
          Add Product
        </Button>
      </Box>
    </Box>
  );
};

export default AddProduct;
