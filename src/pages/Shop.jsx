import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Grid, Tabs, Tab } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';

export default function Shop({ favoriteItems, onToggleFavorite }) {
  const location = useLocation();
  const [section, setSection] = useState('clothes');
  const [products, setProducts] = useState({ clothes: [], bags: [], shoes: [] });
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => setSection(newValue);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sec = params.get('section');
    if (sec && ['clothes', 'bags', 'shoes'].includes(sec)) setSection(sec);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [clothesRes, bagsRes, shoesRes] = await Promise.all([
          axios.get('https://dummyjson.com/products/category/womens-dresses'),
          axios.get('https://dummyjson.com/products/category/womens-bags'),
          axios.get('https://dummyjson.com/products/category/mens-shoes'),
        ]);

        setProducts({
          clothes: clothesRes.data.products,
          bags: bagsRes.data.products,
          shoes: shoesRes.data.products,
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10 }} />;

  return (
    <Box padding={5}>
      <Typography variant="h4" gutterBottom textAlign="center">Shop</Typography>

      <Tabs value={section} onChange={handleChange} centered sx={{ mb: 5 }}>
        <Tab label="Clothes" value="clothes" />
        <Tab label="Bags" value="bags" />
        <Tab label="Shoes" value="shoes" />
      </Tabs>

      <Grid container spacing={5} justifyContent="center">
        {products[section].map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard 
              product={product} 
              favoriteItems={favoriteItems} 
              onToggleFavorite={onToggleFavorite} 
              sxCard={{ width: '100%', minHeight: 450 }} 
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
