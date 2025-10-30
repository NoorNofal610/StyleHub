import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartItem({ product, onRemove, onQuantityChange }) {
  return (
    <Card
      sx={{
        display: 'flex',
        mb: 2,
        p: 2,
        alignItems: 'center',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)', // تحريك العنصر لأعلى
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)', // إضافة ظل عند hover
        },
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{ width: 100, height: 100, borderRadius: 2 }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{product.title}</Typography>
        <Typography color="text.secondary">Size: {product.size}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
          <TextField
            type="number"
            size="small"
            value={product.quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val) && val > 0) onQuantityChange(product.id, product.size, val);
            }}
            sx={{ width: 60 }}
            inputProps={{ style: { textAlign: 'center' }, min: 1 }}
          />
          <Typography color="#FDC65B" fontWeight="bold">
            ${product.price * product.quantity}
          </Typography>
        </Box>
      </CardContent>
      <IconButton onClick={() => onRemove(product)}>
        <DeleteIcon sx={{ color: 'red' }} />
      </IconButton>
    </Card>
  );
}
