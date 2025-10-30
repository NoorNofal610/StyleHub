import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Container, Menu, MenuItem, Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
import Search from './Search';
import Login from './Login';
import Favorites from './Favorites';
import ProductCard from './ProductCard';

export default function Navbar({ favoriteItems, onToggleFavorite, cartItems, onRemoveCartItem }) {
  const [anchorElSearch, setAnchorElSearch] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [mode, setMode] = useState('login');
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderBottom: '2px solid #FDC65B' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 } }}>
              <ShoppingCartIcon sx={{ color: '#FDC65B', mr: 1 }} />
              <RouterLink to="/" style={logoStyle}>StyleHub</RouterLink>
            </Box>

            {/* Desktop Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, flexGrow: 1, justifyContent: 'center' }}>
              <RouterLink to="/" style={navLinkStyle}>Home</RouterLink>
              <RouterLink to="/#about" style={navLinkStyle}>About Us</RouterLink>
              <RouterLink to="/shop" style={navLinkStyle}>Shop</RouterLink>
              <RouterLink to="/#contact" style={navLinkStyle}>Contact</RouterLink>
            </Box>

            {/* Desktop Right Icons */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              <IconButton onClick={(e) => setAnchorElSearch(e.currentTarget)}><SearchIcon /></IconButton>
              <IconButton onClick={() => { setMode('login'); setDrawerOpen(true); }}><PersonOutlineIcon /></IconButton>
              <IconButton onClick={() => setFavoritesOpen(true)}>
                <FavoriteBorderIcon sx={{ color: favoriteItems.length > 0 ? 'orange' : '#333' }} />
              </IconButton>
              <IconButton onClick={() => setCartOpen(true)}>
                <ShoppingCartIcon sx={{ color: cartItems.length > 0 ? 'orange' : '#333' }} />
              </IconButton>
            </Box>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={handleOpenNavMenu}><MenuIcon sx={{ color: '#333' }} /></IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                <MenuItem onClick={handleCloseNavMenu}><RouterLink to="/" style={mobileLinkStyle}>Home</RouterLink></MenuItem>
                <MenuItem onClick={handleCloseNavMenu}><RouterLink to="/#about" style={mobileLinkStyle}>About Us</RouterLink></MenuItem>
                <MenuItem onClick={handleCloseNavMenu}><RouterLink to="/shop" style={mobileLinkStyle}>Shop</RouterLink></MenuItem>
                <MenuItem onClick={handleCloseNavMenu}><RouterLink to="/#contact" style={mobileLinkStyle}>Contact</RouterLink></MenuItem>
                <MenuItem onClick={() => { handleCloseNavMenu(); setFavoritesOpen(true); }}><RouterLink to="#" style={mobileLinkStyle}>Favorites</RouterLink></MenuItem>
                <MenuItem onClick={() => { handleCloseNavMenu(); setCartOpen(true); }}><RouterLink to="#" style={mobileLinkStyle}>Cart</RouterLink></MenuItem>
              </Menu>
            </Box>

            {/* Components */}
            <Search anchorEl={anchorElSearch} open={Boolean(anchorElSearch)} onClose={() => setAnchorElSearch(null)} />
            <Login open={drawerOpen} onClose={() => setDrawerOpen(false)} mode={mode} setMode={setMode} />
<Favorites 
  open={favoritesOpen} 
  onClose={() => setFavoritesOpen(false)} 
  favorites={favoriteItems} 
  onRemove={onToggleFavorite} // ← هاد ضروري تمرره
/>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Cart Dialog */}
      <Dialog open={cartOpen} onClose={() => setCartOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Your Cart</DialogTitle>
        <DialogContent>
          {cartItems.length === 0 ? (
            <Typography>No items in cart.</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              {cartItems.map(product => (
               <ProductCard
  key={product.id}
  product={product}
  favoriteItems={favoriteItems}       // قائمة الفيفوريت الحالية
  onToggleFavorite={onToggleFavorite} // ← هذه الدالة يجب تمريرها
  sxCard={{ width: 250, minHeight: 400 }}
  showNewBadge={true}
/>
                // <h1>hii</h1>
              ))}
            </Box>
          )}
        </DialogContent>
      </Dialog>
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

const mobileLinkStyle = {
  textDecoration: 'none',
  color: '#333',
  width: '100%',
  display: 'block',
  textAlign: 'center',
  fontFamily: "'Montserrat', sans-serif",
  cursor: 'pointer',
};
