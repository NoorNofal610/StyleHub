import * as React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Header() {
  return (
<Box
  sx={{
    minHeight: '100vh',
    backgroundColor: '#F8EDEE',
    display: 'flex',           
    alignItems: 'center',       
    justifyContent: 'center',  
    position: 'relative',
  }}
>      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 0,
            pt: { xs: 2, md: 5 }, 
            position: 'relative',
          }}
        >
          {/* Text Section */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#222', mb: 2 }}>
              EXPRESS YOUR STYLE
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.6 }}>
              We create personalities, not just stitched fabric.
            </Typography>
           
<Button
  component={RouterLink}
  to="/shop"
  variant="contained"
  sx={{
    mt: 4,
    backgroundColor: '#FDC65B',
    color: '#fff',
    px: 4,
    py: 1.5,
    fontWeight: 'bold',
    '&:hover': { backgroundColor: '#e6b14d' },
  }}
>
  Shop Now
</Button>
          </Box>

          {/* Image Section */}
          <Box
            sx={{
              flex: 1,
              mt: { xs: 5, md: 0 },
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
              position: 'relative',
            }}
          >
            {/* خلفية بيضاء خلف الصورة */}
            <Box
              sx={{
                position: 'absolute',
                top: { xs: '5%', md: '-5%' },
                right: { xs: '0', md: '-5%' },
                width: { xs: '90%', md: '80%' },
                height: { xs: '35vh', md: '60vh' },
                bgcolor: '#fff',
                borderRadius: 3,
                zIndex: 1,
              }}
            />

            <Box
              component="img"
              src="/images/clothes.JPG"
              alt="Fashion"
              sx={{
                width: { xs: '90%', md: '80%' },
                height: { xs: '35vh', md: '60vh' },
                objectFit: 'cover',
                borderRadius: 3,
                boxShadow: 3,
                position: 'relative',
                zIndex: 2,
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
