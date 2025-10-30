import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProductCard from './ProductCard';

export default function WhatsNew({ favoriteItems, onToggleFavorite }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const womenDress = await axios.get("https://dummyjson.com/products/category/womens-dresses");
        const womenBags = await axios.get("https://dummyjson.com/products/category/womens-bags");
        setProducts([...womenDress.data.products, ...womenBags.data.products]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10 }} />;

  return (
    <Box padding={3} position="relative">
      <Typography variant="h4" gutterBottom>What's New</Typography>

      <IconButton onClick={() => scroll('left')} sx={{ position: 'absolute', top: '50%', left: 0 }}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton onClick={() => scroll('right')} sx={{ position: 'absolute', top: '50%', right: 0 }}>
        <ArrowForwardIosIcon />
      </IconButton>

      <Box ref={scrollRef} sx={{ display: 'flex', overflowX: 'auto', gap: 2, py: 2 }}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            favoriteItems={favoriteItems}
            onToggleFavorite={onToggleFavorite}
            sxCard={{ width: 250, minHeight: 400 }}
            showNewBadge={true}
          />
        ))}
      </Box>
    </Box>
  );
}
