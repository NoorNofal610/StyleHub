import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, CardMedia, Container, CircularProgress, Button, TextField, 
  MenuItem, Select, FormControl, InputLabel, Accordion, AccordionSummary, 
  AccordionDetails, Drawer, IconButton 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

export default function ProductDetail({ onAddToCart, onToggleFavorite, favoriteItems }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10 }} />;
  if (!product) return <Typography textAlign="center" mt={5}>Product not found</Typography>;

  // تحديد نوع المنتج بشكل موثوق: category إذا موجودة، وإلا الاسم
  const getProductType = (product) => {
    if (product.category) {
      const cat = product.category.toLowerCase();
      if (cat.includes('clothing')) return 'clothing';
      if (cat.includes('shoes')) return 'shoes';
      if (cat.includes('bag')) return 'bags';
    }
    // fallback على الاسم
    const title = product.title.toLowerCase();
    if (title.includes('shirt') || title.includes('dress') || title.includes('top')) return 'clothing';
    if (title.includes('shoe') || title.includes('sneaker')) return 'shoes';
    if (title.includes('bag') || title.includes('backpack') || title.includes('handbag')) return 'bags';
    return 'clothing';
  };

  const productType = getProductType(product);
  const isClothing = productType === 'clothing';
  const isShoes = productType === 'shoes';
  const isBag = productType === 'bags';

  const clothingSizes = ['S', 'M', 'L', 'XL'];
  const shoeSizes = ['5', '6', '6.5', '7', '8', '8.5', '9', '9.5', '10', '11'];

  const handleAddToCartClick = () => {
    if ((isClothing || isShoes) && !size) {
      alert("Please select a size before adding to cart.");
      return;
    }
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity,
      size: isBag ? null : size,
    };
    onAddToCart(cartProduct);
    alert(`✅ Added ${quantity} x ${product.title}${!isBag ? ` (${size})` : ''} to cart`);
  };

  const handleToggleWishlist = () => {
    if (product) onToggleFavorite(product);
  };

  const isFavorite = favoriteItems.find(item => item.id === product?.id);

  return (
    <Box sx={{ minHeight: '100vh', py: 10, background: '#F8EDEE' }}>
      <Container maxWidth="lg">
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/shop')}
          sx={{ mb: 3, color: '#000', borderColor: '#000', textTransform: 'none' }}
        >
          Back to Shop
        </Button>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start', gap: 5 }}>
          <Box sx={{ flex: '1', minWidth: '350px' }}>
            <CardMedia
              component="img"
              image={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400'}
              alt={product.title}
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Box>

          <Box sx={{ flex: '1.2', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5" fontWeight="bold">{product.title}</Typography>
            <Typography variant="h6" color="#FDC65B">${product.price}</Typography>

            {!isBag && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="size-label">Size</InputLabel>
                <Select
                  labelId="size-label"
                  value={size}
                  label="Size"
                  onChange={(e) => setSize(e.target.value)}
                >
                  <MenuItem value=""><em>Choose an option</em></MenuItem>
                  {(isClothing ? clothingSizes : shoeSizes).map(s => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                type="number"
                value={quantity}
                size="small"
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val > 0) setQuantity(val);
                  else if (e.target.value === '') setQuantity('');
                }}
                sx={{ width: 80 }}
                inputProps={{ style: { textAlign: 'center' }, min: 1 }}
              />
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ backgroundColor: '#FDC65B', '&:hover': { backgroundColor: '#e6b953' } }}
                onClick={handleAddToCartClick}
              >
                ADD TO CART
              </Button>
            </Box>

            <Button 
              sx={{ textTransform: 'none' }}
              startIcon={isFavorite ? <FavoriteIcon color="error"/> : <FavoriteBorderIcon />}
              onClick={handleToggleWishlist}
            >
              {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>

            {!isBag && (
              <Button sx={{ textTransform: 'none' }} onClick={() => setDrawerOpen(true)}>📏 SIZE & FIT GUIDE</Button>
            )}

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Description</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{product.description}</Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Delivery and Returns</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Complimentary express shipping. Free returns worldwide. You have 30 days from receipt to return items.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>

        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 400, p: 3, position: 'relative' }}>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ position: 'absolute', top: 8, right: 8 }}>
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" fontWeight="bold" mb={2} textAlign="center">Size Guide</Typography>

            {isClothing && (
              <>
                <Typography mb={2}>Clothing size guide:</Typography>
                <Typography>US | Bust | Waist | Hips</Typography>
                <Typography>0 | 77-80 | 58-61 | 86-89</Typography>
                <Typography>2 | 80-83 | 61-64 | 89-92</Typography>
                <Typography>4 | 84-87 | 65-68 | 93-97</Typography>
                <Typography>6 | 88-91 | 69-72 | 98-101</Typography>
                <Typography>8 | 92-95 | 73-76 | 101-104</Typography>
                <Typography>10 | 96-99 | 77-80 | 105-108</Typography>
                <Typography>12 | 100-103 | 81-84 | 109-112</Typography>
              </>
            )}

            {isShoes && (
              <>
                <Typography mb={2}>Shoe size guide:</Typography>
                <Typography>US | UK | EU | JP</Typography>
                <Typography>5.5 | 2 | 35 | 22</Typography>
                <Typography>6 | 3 | 36 | 23</Typography>
                <Typography>6.5 | 3.5 | 36.5 | 23.5</Typography>
                <Typography>7 | 4 | 37 | 24</Typography>
                <Typography>8 | 5 | 38 | 25</Typography>
                <Typography>8.5 | 5.5 | 38.5 | 25.5</Typography>
                <Typography>9 | 6 | 39 | 26</Typography>
                <Typography>9.5 | 6.5 | 39.5 | 26.5</Typography>
                <Typography>10 | 7 | 40 | 27</Typography>
                <Typography>11 | 8 | 41 | 28</Typography>
              </>
            )}

          </Box>
        </Drawer>
      </Container>
    </Box>
  );
}
