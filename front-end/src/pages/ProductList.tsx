import { Box, Typography, Grid, Card, CardMedia, CardContent, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { httpService } from '../services/httpService';
import { API_REQUESTS } from '../services/apiRequests';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await httpService(API_REQUESTS.GET_FAKE_PRODUCTS);
      console.log('API Response:', data); // Debug the API response
      setProducts(data || []); // Ensure data is an array
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const navigateToPage = (path: string) => {
    navigate(path);
  };

  // Fallback image URL for when product.image is invalid
  const fallbackImage = 'https://via.placeholder.com/200x200?text=No+Image';

  return (
    <Box
      p={2}
      sx={{
        paddingBottom: '72px', // Ensure enough space for BottomNavigation (~56px + extra)
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Product List
      </Typography>
      {loading ? (
        <Grid container spacing={2}>
          {[...Array(4)].map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ height: '100%', minHeight: 300 }}>
                <CardMedia
                  component="img"
                  image={fallbackImage}
                  alt="Loading..."
                  sx={{
                    height: 100,
                    objectFit: 'contain',
                    padding: 2,
                    display: 'block',
                    margin: 'auto',
                    backgroundColor: '#f0f0f0', // Placeholder background
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">Loading...</Typography>
                  <Typography variant="h6" color="primary">
                    $0.00
                  </Typography>
                  <Rating value={0} precision={0.1} readOnly />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : products.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No products available.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {products.map((product: any) => (
            <Grid
              key={product.id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              onClick={() => navigateToPage('/products/' + product.id)}
            >
              <Card sx={{ height: '100%', minHeight: 300 }}>
                <CardMedia
                  component="img"
                  image={product.image || fallbackImage} // Use fallback if image is missing
                  alt={product.title || 'Product Image'}
                  sx={{
                    height: 100,
                    objectFit: 'contain',
                    padding: 2,
                    display: 'block',
                    margin: 'auto',
                    backgroundColor: '#f0f0f0', // Background for placeholder
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    title={product.title || 'No Title'}
                    sx={{ fontWeight: 'medium' }}
                  >
                    {product.title || 'No Title'}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price ? product.price.toFixed(2) : '0.00'}
                  </Typography>
                  <Rating
                    value={
                      product.rating && product.rating.rate
                        ? product.rating.rate
                        : 0
                    }
                    precision={0.1}
                    readOnly
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductList;