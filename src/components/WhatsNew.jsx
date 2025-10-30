import { useContext, useRef } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProductCard from './ProductCard';

export default function WhatsNew({ favoriteItems, onToggleFavorite }) {
  const { products, loading } = useContext(ProductsContext);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10 }} />;

  const whatsNewProducts = [...products.clothes, ...products.bags];

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
        {whatsNewProducts.map(product => (
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
