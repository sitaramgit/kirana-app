import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
const Home = () => {
    return <>
      <Box p={2}>
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      Dashboard
    </Typography>
    <Grid container spacing={2}>
      <Grid size={{xs: 12, sm: 6, md: 4}}>
        <Paper elevation={3} sx={{ p: 2, bgcolor: 'rgb(103, 58, 183)', color: 'white' }}>
          <StoreIcon />
          <Typography variant="h6">Total Shops</Typography>
          <Typography variant="subtitle1">12</Typography>
        </Paper>
      </Grid>
      <Grid size={{xs: 12, sm: 6, md: 4}}>
        <Paper elevation={3} sx={{ p: 2, bgcolor: 'rgb(33, 150, 243)', color: 'white' }}>
          <InventoryIcon />
          <Typography variant="h6">Total Products</Typography>
          <Typography variant="subtitle1">78</Typography>
        </Paper>
      </Grid>
      <Grid size={{xs: 12, sm: 6, md: 4}}>
        <Paper elevation={3} sx={{ p: 2, bgcolor: '#4caf50', color: 'white' }}>
          <AddShoppingCartIcon />
          <Typography variant="h6">New Orders</Typography>
          <Typography variant="subtitle1">14</Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
    </>
};
export default Home;