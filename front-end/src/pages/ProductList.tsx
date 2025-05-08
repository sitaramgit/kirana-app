import { Box, Typography, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const products = [
    { id: 1, name: 'Apples', quantity: 20, price: 50 },
    { id: 2, name: 'Bananas', quantity: 40, price: 30 },
    { id: 3, name: 'Oranges', quantity: 15, price: 60 },
  ];

  const navigateToPage = (path: string) => {
    navigate(path);
  }

  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Product List
      </Typography>
      <List>
        {products.map((product) => (
          <Box key={product.id}>
            <ListItem
            onClick={() => navigateToPage('/products/'+product.id)}
              secondaryAction={
                <IconButton edge="end" aria-label="details">
                  <ArrowForwardIosIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={product.name}
                secondary={`Qty: ${product.quantity} | Price: ₹${product.price}`}
              />
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default ProductList;
