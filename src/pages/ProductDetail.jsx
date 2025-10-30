import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CardMedia, Container, CircularProgress, Button, TextField, MenuItem, Select, FormControl, InputLabel, Accordion, AccordionSummary, AccordionDetails, Drawer, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

export default function ProductDetail({ onAddToCart }) {
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

  const handleAddToCartClick = () => {
    if (!size) {
      alert("Please select a size before adding to cart.");
      return;
    }
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity,
      size,
    };
    onAddToCart(cartProduct);
    alert(`✅ Added ${quantity} x ${product.title} (${size}) to cart`);
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10 }} />;
  if (!product) return <Typography textAlign="center" mt={5}>Product not found</Typography>;

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
          {/* Product Image */}
          <Box sx={{ flex: '1', minWidth: '350px' }}>
            <CardMedia
              component="img"
              image={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400'}
              alt={product.title}
              sx={{ width: '100%', borderRadius: 2 }}
            />
          </Box>

          {/* Product Details */}
          <Box sx={{ flex: '1.2', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5" fontWeight="bold">{product.title}</Typography>
            <Typography variant="h6" color="#FDC65B">${product.price}</Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="size-label">Size</InputLabel>
              <Select labelId="size-label" value={size} label="Size" onChange={(e) => setSize(e.target.value)}>
                <MenuItem value=""><em>Choose an option</em></MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
            </FormControl>

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

            <Button sx={{ textTransform: 'none' }}>♡ ADD TO WISHLIST</Button>
            <Button sx={{ textTransform: 'none' }} onClick={() => setDrawerOpen(true)}>📏 SIZE & FIT GUIDE</Button>

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

        {/* Drawer for Size Guide */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 400, p: 3, position: 'relative' }}>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ position: 'absolute', top: 8, right: 8 }}>
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" fontWeight="bold" mb={2} textAlign="center">Size Guide</Typography>
            <Typography mb={2}>To find out the equivalent sizes by country, see the grid below.</Typography>
            {/* … ضع هنا باقي الجدول كما في الكود السابق */}
            {/* Product measurements */} <Typography variant="subtitle1" fontWeight="bold" mb={1}> Product measurements (cm) </Typography> 
            <Box sx={{ mb: 3 }}> 
              <Typography>US Size | Bust | Waist | Hips</Typography> 
              <Typography>0 | 77-80 | 58-61 | 86-89</Typography> 
              <Typography>2 | 80-83 | 61-64 | 89-92</Typography> 
              <Typography>4 | 84-87 | 65-68 | 93-97</Typography> 
              <Typography>6 | 88-91 | 69-72 | 98-101</Typography> 
              <Typography>8 | 92-95 | 73-76 | 101-104</Typography> 
              <Typography>10 | 96-99 | 77-80 | 105-108</Typography> 
              <Typography>12 | 100-103 | 81-84 | 109-112</Typography> 
              </Box> {/* International Size Comparison */} 
              <Typography variant="subtitle1" fontWeight="bold" mb={1}> International Size Comparison </Typography> 
              <Box sx={{ mb: 3 }}> 
                <Typography>US | UK | IT | FR | DE | JP</Typography> 
                <Typography>0 | 4 | 36 | 32 | 30 | 3</Typography> 
                <Typography>2 | 6 | 38 | 34 | 32 | 5</Typography> 
                <Typography>4 | 8 | 40 | 36 | 34 | 7</Typography> 
                <Typography>6 | 10 | 42 | 38 | 36 | 9</Typography> 
                <Typography>8 | 12 | 44 | 40 | 38 | 11</Typography> 
                <Typography>10 | 14 | 46 | 42 | 40 | 13</Typography> 
                <Typography>12 | 16 | 48 | 44 | 42 | 17</Typography> 
                </Box> {/* Standard Sizing */} <Typography variant="subtitle1" fontWeight="bold" mb={1}> Standard Sizing </Typography> 
                <Box sx={{ mb: 3 }}> 
                  <Typography>Size | US | UK | IT | FR | DE | JP</Typography> 
                  <Typography>XS | 0-2 | 4-6 | 36-38 | 32-34 | 30-32 | 3-5</Typography> 
                  <Typography>S | 2-4 | 6-8 | 38-40 | 34-36 | 32-34 | 5-7</Typography> 
                  <Typography>M | 6-8 | 10-12 | 42-44 | 38-40 | 36-38 | 9-11</Typography> 
                  <Typography>L | 8-10 | 12-14 | 44-46 | 40-42 | 38-40 | 11-13</Typography> 
                  <Typography>XL | 10-12 | 14-16 | 46-48 | 42-44 | 40-44 | 13-15</Typography> 
                  </Box> {/* Shoe Size */} 
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}> Shoe Size </Typography>
                   <Box> 
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
                    </Box>

          </Box>
        </Drawer>
      </Container>
    </Box>
  );
}
