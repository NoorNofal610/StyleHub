import React, { useState } from 'react';
import { Box, Typography, Button, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function AboutUs() {
  const [open, setOpen] = useState(false);

  return (
    <Box
      component="section"
      sx={{
        py: 10,
        px: { xs: 3, md: 10 },
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: 4,
      }}
    >
      {/* الصورة على اليسار */}
      <Box
        component="img"
        src="/images/bag2.JPG"
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
        </Typography>

        <Typography variant="body1" color="textSecondary" paragraph>
          Our mission is to provide high-quality products at affordable prices while offering exceptional customer service.
        </Typography>

        <Button
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
          onClick={() => setOpen(true)}
        >
          Learn More
        </Button>
      </Box>

      {/* Modal موسع مع صورة خلفية */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
      >
        <Box
          sx={{
            width: { xs: '90%', md: 700 },
            maxHeight: '90vh',
            bgcolor: 'rgba(255,255,255,0.9)', // خلفية شفافة قليلاً
            borderRadius: 3,
            p: 4,
            position: 'relative',
            boxShadow: 24,
            overflowY: 'auto',
            backgroundImage: 'url(/images/about-bg2.JPG)', // صورة الخلفية
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff',
          }}
        >
          {/* زر الإغلاق */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8, color: '#fff' }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
            About Our Store
          </Typography>

          <Typography variant="body1" paragraph>
            At StyleHub, we believe fashion is a way to express yourself. We curate a wide range of clothing, accessories, and lifestyle products that cater to modern trends.
          </Typography>

          <Typography variant="body1" paragraph>
            Our team is dedicated to sourcing high-quality materials and unique designs, ensuring that every purchase brings joy and satisfaction.
          </Typography>

          <Typography variant="body1" paragraph>
            Explore our collections and enjoy a seamless shopping experience, whether online or in-store. Your style journey starts here!
          </Typography>

          <Typography variant="body1" paragraph>
            We also offer personalized styling advice and seasonal promotions to keep you inspired. Join our community and share your unique style with the world.
          </Typography>

          <Typography variant="body1" paragraph>
            At StyleHub, we are more than just a store — we are a lifestyle destination that connects fashion enthusiasts, trendsetters, and innovators in the industry. Your satisfaction is our top priority.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default AboutUs;
