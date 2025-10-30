// src/components/SearchMenu.jsx
import React from 'react';
import { Box, Menu, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const suggestedItems = [
  { label: 'NEW', hash: '#whatsnew' },
  { label: 'CONTACT US', hash: '#contact' },
  { label: 'CLOTHES', path: '/shop?section=clothes' },
  { label: 'BAGS', path: '/shop?section=bags' },
  { label: 'SHOSE', path: '/shop?section=shoes' },
];

export default function Search({ anchorEl, open, onClose }) {
  const navigate = useNavigate();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Box sx={{ p: 2, width: 250 }}>
        <TextField autoFocus placeholder="Search..." size="small" variant="outlined" fullWidth />
        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>Suggested</Typography>
        {suggestedItems.map((item) => (
          <Box
            key={item.label}
            onClick={() => {
              onClose();
              if (item.hash) navigate(`/${item.hash}`);
              else if (item.path) navigate(item.path);
            }}
            sx={{ p: 1, cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
          >
            {item.label}
          </Box>
        ))}
      </Box>
    </Menu>
  );
}
