import * as React from "react";
import { Box, Typography, IconButton, Stack, Divider } from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1f1f1f",
        color: "#fff",
        py: { xs: 6, md: 8 },
        px: { xs: 3, md: 10 },
        mt: 6,
      }}
    >
      {/* main*/}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={{ xs: 4, md: 6 }}
      >
        {/* logo*/}
       <Box sx={{ maxWidth: 450 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <ShoppingCartIcon
          sx={{
            color: "#FDC65B",
            fontSize: 34,
            mr: 1,
          }}
        />
        <Typography
          variant="h5"
          component="a"
          href="#"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "1.7rem",
            letterSpacing: ".15rem",
            color: "#f9f9f9ff",
            textDecoration: "none",
          }}
        >
          StyleHub
        </Typography>
      </Box>

      {/* describtion */}
      <Typography variant="body2" sx={{ color: "#ccc", lineHeight: 1.8 }}>
        Welcome to StyleHub — your destination for high-quality fashion,
        accessories, and lifestyle products. We’re dedicated to providing
        the latest trends with exceptional customer service and a secure
        shopping experience.
      </Typography>
    </Box>

        {/* contact us*/}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1.5,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Contact Us
          </Typography>
          <Typography variant="body2" sx={{ color: "#bbb" }}>
            📍 Tulkarm, Palestine
          </Typography>
          <Typography variant="body2" sx={{ color: "#bbb" }}>
            📧 support@mystore.com
          </Typography>
          <Typography variant="body2" sx={{ color: "#bbb" }}>
            ☎️ +970 59 123 4567
          </Typography>

          {/* social media*/}
          <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
  <IconButton
    component="a"
    href="https://www.facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    color="inherit"
    size="small"
    sx={{
      backgroundColor: "rgba(255,255,255,0.1)",
      "&:hover": { backgroundColor: "#FDC65B", color: "#000" },
    }}
  >
    <Facebook />
  </IconButton>

  <IconButton
    component="a"
    href="https://www.instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    color="inherit"
    size="small"
    sx={{
      backgroundColor: "rgba(255,255,255,0.1)",
      "&:hover": { backgroundColor: "#FDC65B", color: "#000" },
    }}
  >
    <Instagram />
  </IconButton>

  <IconButton
    component="a"
    href="https://www.twitter.com"
    target="_blank"
    rel="noopener noreferrer"
    color="inherit"
    size="small"
    sx={{
      backgroundColor: "rgba(255,255,255,0.1)",
      "&:hover": { backgroundColor: "#FDC65B", color: "#000" },
    }}
  >
    <Twitter />
  </IconButton>

  <IconButton
    component="a"
    href="https://www.youtube.com"
    target="_blank"
    rel="noopener noreferrer"
    color="inherit"
    size="small"
    sx={{
      backgroundColor: "rgba(255,255,255,0.1)",
      "&:hover": { backgroundColor: "#FDC65B", color: "#000" },
    }}
  >
    <YouTube />
  </IconButton>
</Stack>

        </Box>
      </Stack>

      <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          color: "#aaa",
          fontSize: "0.9rem",
          letterSpacing: 0.5,
        }}
      >
        © 2025 MyStore. All rights reserved.
      </Typography>
    </Box>
  );
}
