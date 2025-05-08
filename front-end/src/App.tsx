import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto';
import Layout from './Layout';
import theme from './theme';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import BarcodeScannerPage from './pages/BarcodeScannerPage';
import { Capacitor } from '@capacitor/core';


// Main App
const App: React.FC = () => {
  const isAndroid = Capacitor.getPlatform() === 'android';
  return (
    <ThemeProvider theme={theme}>
      <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
<Route path="/products/:id" element={<ProductDetails />} />
<Route path="/add-product" element={<AddProduct />} />
{isAndroid && <Route path="/scan" element={<BarcodeScannerPage />} />}
      </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;