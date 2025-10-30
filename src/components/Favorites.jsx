import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProductCard from './ProductCard';

function Favorites({ open, onClose, favorites, onRemove }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Your Favorites
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {favorites.length === 0 ? (
          <Typography>No favorite items.</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {favorites.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                favoriteItems={favorites} 
                onToggleFavorite={onRemove}
                sxCard={{ width: 250, minHeight: 400 }}
              />
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default Favorites;
