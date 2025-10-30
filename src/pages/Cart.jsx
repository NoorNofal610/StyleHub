import React from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Cart({ cartItems, onRemoveCartItem }) {
  return (
    <Box sx={{ background: '#F8EDEE', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
          🛒 Your Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Typography textAlign="center">Your cart is empty.</Typography>
        ) : (
          cartItems.map((item) => (
            <Card key={item.id} sx={{ display: 'flex', mb: 2, p: 2, alignItems: 'center' }}>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{ width: 100, height: 100, borderRadius: 2 }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography color="text.secondary">Size: {item.size}</Typography>
                <Typography color="text.secondary">Qty: {item.quantity}</Typography>
                <Typography color="#FDC65B" fontWeight="bold">${item.price * item.quantity}</Typography>
              </CardContent>
              <IconButton onClick={() => onRemoveCartItem(item)}>
                <DeleteIcon sx={{ color: 'red' }} />
              </IconButton>
            </Card>
          ))
        )}
      </Container>
    </Box>
  );
}
