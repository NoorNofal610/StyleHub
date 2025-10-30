// src/components/LoginDrawer.jsx
import React from 'react';
import { Drawer, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Login({ open, onClose, mode, setMode }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{
        width: { xs: '95vw', md: 700 },
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        position: 'relative',
      }}>
        {/* زر X */}
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}><CloseIcon /></IconButton>

        {/* صورة جانبية */}
        <Box sx={{
          flex: 1,
          display: { xs: 'none', md: 'block' },
          backgroundImage: 'url(/images/login.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        }} />

        {/* نموذج */}
        <Box sx={{ flex: 1, p: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>
          <Typography variant="h3" fontWeight="bold" mb={3}>
            {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
          </Typography>
          <Typography variant="body1" mb={4}>
            {mode === 'login' ? 'Login to your account to continue shopping.' : 'Sign up to get started with StyleHub.'}
          </Typography>

          {/* حقول */}
          <TextField fullWidth label="Email" variant="outlined" sx={{ mb: 3 }} />
          <TextField fullWidth label="Password" type="password" variant="outlined" sx={{ mb: 3 }} />
          {mode === 'signup' && <TextField fullWidth label="Confirm Password" type="password" variant="outlined" sx={{ mb: 3 }} />}

          <Button fullWidth variant="contained" sx={{ mb: 3, backgroundColor: '#FDC65B', color: '#333', '&:hover': { backgroundColor: '#faba33' } }}>
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </Button>

          <Typography variant="body2" textAlign="center">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <Box component="span" sx={{ color: '#FDC65B', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
              {mode === 'login' ? 'Sign Up' : 'Login'}
            </Box>
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
