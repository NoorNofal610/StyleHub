import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, sxCard, favoriteItems = [], onToggleFavorite, showNewBadge = false }) {
  const navigate = useNavigate();

  const isFavorite = favoriteItems.find(item => item.id === product.id);

  return (
    <Card
      sx={{
        position: 'relative',
        flexShrink: 0,
        transition: 'transform 0.3s',
        '&:hover': { transform: 'scale(1.05)' },
        display: 'flex',
        flexDirection: 'column',
        ...sxCard,
      }}
    >
      {showNewBadge && (
        <Box sx={{ position: 'absolute', top: 8, left: 8, bgcolor: '#FF5252', color: 'white', px: 1.5, py: 0.5, borderRadius: 1, fontSize: 12, fontWeight: 'bold', zIndex: 2 }}>
          NEW
        </Box>
      )}

      <IconButton
        sx={{ position: 'absolute', top: 8, right: 8, color: isFavorite ? 'orange' : '#FDC65B', zIndex: 2 }}
        onClick={() => onToggleFavorite(product)}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      <CardMedia
        component="img"
        height="300"
        image={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/300'}
        alt={product.title}
        sx={{ objectFit: 'contain', padding: 2, flexGrow: 1 }}
      />

      <CardContent>
        <Typography variant="subtitle1" gutterBottom noWrap>{product.title}</Typography>
        <Typography variant="h6" color="black">${product.price}</Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: '#FDC65B', '&:hover': { backgroundColor: '#e6b953' } }}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          Show
        </Button>
      </CardContent>
    </Card>
  );
}
