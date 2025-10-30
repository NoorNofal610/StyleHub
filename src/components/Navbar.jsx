import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Container, Drawer, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Search from './Search';
import Login from './Login';
import Favorites from './Favorites';

export default function Navbar({ favoriteItems, onToggleFavorite, cartItems }) {
  const [anchorElSearch, setAnchorElSearch] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mode, setMode] = useState('login');
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          borderBottom: '2px solid #FDC65B',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 } }}>
              <ShoppingCartIcon sx={{ color: '#FDC65B', mr: 1 }} />
              <RouterLink to="/" style={logoStyle}>StyleHub</RouterLink>
            </Box>

            {/* Desktop links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, flexGrow: 1, justifyContent: 'center' }}>
              <RouterLink to="/" style={navLinkStyle}>Home</RouterLink>
              <RouterLink to="/#about" style={navLinkStyle}>About Us</RouterLink>
              <RouterLink to="/shop" style={navLinkStyle}>Shop</RouterLink>
              <RouterLink to="/#contact" style={navLinkStyle}>Contact</RouterLink>
            </Box>

            {/* Desktop icons */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              <IconButton onClick={(e) => setAnchorElSearch(e.currentTarget)}><SearchIcon /></IconButton>
              <IconButton onClick={() => { setMode('login'); setDrawerOpen(true); }}><PersonOutlineIcon /></IconButton>
              <IconButton onClick={() => setFavoritesOpen(true)}>
                <FavoriteBorderIcon sx={{ color: favoriteItems.length > 0 ? 'orange' : '#333' }} />
              </IconButton>
              <IconButton onClick={() => navigate('/cart')}>
                <ShoppingCartIcon sx={{ color: cartItems.length > 0 ? 'orange' : '#333' }} />
              </IconButton>
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton onClick={() => setMobileMenuOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <Box sx={{ width: 250, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Navigation Links */}
          <RouterLink to="/" style={drawerLinkStyle} onClick={() => setMobileMenuOpen(false)}>Home</RouterLink>
          <RouterLink to="/#about" style={drawerLinkStyle} onClick={() => setMobileMenuOpen(false)}>About Us</RouterLink>
          <RouterLink to="/shop" style={drawerLinkStyle} onClick={() => setMobileMenuOpen(false)}>Shop</RouterLink>
          <RouterLink to="/#contact" style={drawerLinkStyle} onClick={() => setMobileMenuOpen(false)}>Contact</RouterLink>

          <Divider sx={{ my: 1 }} />

          {/* Icons as Text */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box
              sx={drawerLinkStyle}
              onClick={(e) => { setAnchorElSearch(e.currentTarget); setMobileMenuOpen(false); }}
            >
              🔍 Search
            </Box>
            <Box
              sx={drawerLinkStyle}
              onClick={() => { setMode('login'); setDrawerOpen(true); setMobileMenuOpen(false); }}
            >
              👤 Login
            </Box>
            <Box
              sx={drawerLinkStyle}
              onClick={() => { setFavoritesOpen(true); setMobileMenuOpen(false); }}
            >
              ❤️ Favorites ({favoriteItems.length})
            </Box>
            <Box
              sx={drawerLinkStyle}
              onClick={() => { navigate('/cart'); setMobileMenuOpen(false); }}
            >
              🛒 Cart ({cartItems.length})
            </Box>
          </Box>
        </Box>
      </Drawer>

      {/* Components */}
      <Search anchorEl={anchorElSearch} open={Boolean(anchorElSearch)} onClose={() => setAnchorElSearch(null)} />
      <Login open={drawerOpen} onClose={() => setDrawerOpen(false)} mode={mode} setMode={setMode} />
      <Favorites open={favoritesOpen} onClose={() => setFavoritesOpen(false)} favorites={favoriteItems} onRemove={onToggleFavorite} />
    </>
  );
}

const logoStyle = {
  textDecoration: 'none',
  color: '#333',
  fontFamily: "'Playfair Display', serif",
  fontWeight: 700,
  fontSize: '1.6rem',
  letterSpacing: '.15rem',
  cursor: 'pointer',
};

const navLinkStyle = {
  color: '#333',
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 500,
  fontSize: '1rem',
  textTransform: 'uppercase',
  cursor: 'pointer',
  textDecoration: 'none',
};

const drawerLinkStyle = {
  color: '#333',
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 500,
  fontSize: '1rem',
  textTransform: 'none',
  cursor: 'pointer',
};
