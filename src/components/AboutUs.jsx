import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function AboutUs() {
  return (
    <Box
      component="section"
      sx={{
        py: 10,
        px: { xs: 3, md: 10 },
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // عمودي على الموبايل وأفقي على الديسكتوب
        alignItems: 'center',
        gap: 4,
      }}
    >
      {/* الصورة على اليسار */}
      <Box
        component="img"
        src="/images/bag2.JPG" // ضع هنا رابط الصورة الصحيح
        alt="About Us"
        sx={{
          width: { xs: '90%', md: '40%' },
          height: { xs: 'auto', md: 400 },
          objectFit: 'cover',
          borderRadius: 3,
          boxShadow: 3,
        }}
      />

      {/* النصوص على اليمين */}
      <Box sx={{ width: { xs: '100%', md: '50%' }, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          About Us
        </Typography>

        <Typography variant="body1" color="textSecondary" paragraph>
          Welcome to our store! We are passionate about bringing you the latest trends in fashion and lifestyle. 
          Our mission is to provide high-quality products at affordable prices while offering exceptional customer service.
        </Typography>

        <Typography variant="body1" color="textSecondary" paragraph>
          Whether you're shopping for clothes, accessories, or lifestyle products, we strive to make your experience enjoyable 
          and inspiring.
        </Typography>

        <Button
          variant="contained"
          color="primary"
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
          Learn More
        </Button>
      </Box>
    </Box>
  );
}

export default AboutUs;
