import React, { useState } from 'react';
import { Box, Typography, Container, Button, Divider, Paper, RadioGroup, FormControlLabel, Radio, Modal, TextField, IconButton } from '@mui/material';
import CartItem from '../components/CartItem';
import CloseIcon from '@mui/icons-material/Close';

export default function Cart({ cartItems, onRemoveCartItem, onQuantityChange, setCartItems }) {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [visaModalOpen, setVisaModalOpen] = useState(false);
  const [visaInfo, setVisaInfo] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [orderCompleted, setOrderCompleted] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayClick = () => {
    if (paymentMethod === 'visa') {
      setVisaModalOpen(true);
    } else {
      completeOrder();
    }
  };

  const handleVisaPay = () => {
    completeOrder();
    setVisaModalOpen(false);
  };

  const completeOrder = () => {
    // مسح جميع العناصر من الـ cart
    setCartItems([]);
    // إظهار رسالة التهنئة
    setOrderCompleted(true);
  };

  if (orderCompleted) {
    // صفحة التهنئة بعد الدفع
    return (
     <Box
  sx={{
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#F8EDEE',
    p: 3,
  }}
>
  <Paper 
    sx={{ 
      p: 5, 
      textAlign: 'center', 
      borderRadius: 3, 
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
      mt: '-120px',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-10px) scale(1.03)',
        boxShadow: '0 12px 25px rgba(0,0,0,0.3)',
      }
    }}
  >
    <Typography variant="h3" fontWeight="bold" mb={3} color="#FDC65B">
      🎉 Congratulations!
    </Typography>
    <Typography variant="h5" color="#333">
      Your order has been placed successfully.
    </Typography>
    <Typography variant="body1" mt={2}>
      Thank you for shopping with us.
    </Typography>
  </Paper>
</Box>

    );
  }

  return (
    <Box sx={{ background: '#F8EDEE', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        
        {/* Cart Items */}
        <Box sx={{ flex: 2 }}>
          <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">🛒 Your Cart</Typography>
          {cartItems.length === 0 ? (
            <Typography textAlign="center">Your cart is empty.</Typography>
          ) : (
            <>
              {cartItems.map(item => (
                <CartItem
                  key={item.id + '-' + item.size}
                  product={item}
                  onRemove={onRemoveCartItem}
                  onQuantityChange={onQuantityChange}
                />
              ))}
            </>
          )}
        </Box>

        {/* Checkout Box */}
        {cartItems.length > 0 && (
          <Box sx={{ flex: 1, position: { md: 'sticky' }, top: { md: 100 }, alignSelf: 'flex-start' }}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <Typography variant="h6" mb={2}>Order Summary</Typography>
              <Typography>Number of items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</Typography>
              <Typography fontWeight="bold" mt={1} mb={2}>Total: ${total.toFixed(2)}</Typography>

              <Divider sx={{ mb: 2 }} />

              <Typography mb={1}>Payment Method:</Typography>
              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
                <FormControlLabel value="visa" control={<Radio />} label="Visa" />
              </RadioGroup>

              <Button
                variant="contained"
                disableElevation
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: '#FDC65B',
                  color: '#000',
                  '&:hover': { backgroundColor: '#e6b953' }
                }}
                onClick={handlePayClick}
              >
                Pay Now
              </Button>
            </Paper>
          </Box>
        )}
      </Container>

      {/* Visa Modal */}
      <Modal open={visaModalOpen} onClose={() => setVisaModalOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', md: 400 },
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          position: 'relative'
        }}>
          <IconButton
            onClick={() => setVisaModalOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" fontWeight="bold" textAlign="center">Enter Visa Details</Typography>
          <TextField
            label="Card Number"
            fullWidth
            value={visaInfo.cardNumber}
            onChange={(e) => setVisaInfo({ ...visaInfo, cardNumber: e.target.value })}
          />
          <TextField
            label="Expiry (MM/YY)"
            fullWidth
            value={visaInfo.expiry}
            onChange={(e) => setVisaInfo({ ...visaInfo, expiry: e.target.value })}
          />
          <TextField
            label="CVV"
            fullWidth
            value={visaInfo.cvv}
            onChange={(e) => setVisaInfo({ ...visaInfo, cvv: e.target.value })}
          />
          <Button
            variant="contained"
            sx={{
              mt: 1,
              backgroundColor: '#FDC65B',
              color: '#000',
              '&:hover': { backgroundColor: '#e6b953' }
            }}
            onClick={handleVisaPay}
            disabled={
              !visaInfo.cardNumber.trim() ||
              !visaInfo.expiry.trim() ||
              !visaInfo.cvv.trim()
            }
          >
            Pay
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
