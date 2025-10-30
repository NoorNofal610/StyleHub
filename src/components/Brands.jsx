import React from "react";
import { Box, Typography, keyframes } from "@mui/material";

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const brands = [
  { name: "GUCCI", fontFamily: "'Playfair Display', serif" },
  { name: "ZARA", fontFamily: "'Montserrat', sans-serif" },
  { name: "H&M", fontFamily: "'Poppins', sans-serif" },
  { name: "NIKE", fontFamily: "'Bebas Neue', sans-serif" },
  { name: "PRADA", fontFamily: "'Merriweather', serif" },
  { name: "DIOR", fontFamily: "'Raleway', sans-serif" },
  { name: "BALENCIAGA", fontFamily: "'Oswald', sans-serif" },
];

export default function Brands() {
  return (
    <Box
      sx={{
        overflow: "hidden",
        py: 6,
        px: { xs: 2, md: 6 },
        bgcolor: "#fafafa",
        whiteSpace: "nowrap",
        position: "relative",
      }}
    >
      {/* main container*/}
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          animation: `${scroll} 25s linear infinite`,
        }}
      >
        {/*2 times*/}
        {[...brands, ...brands].map((brand, index) => (
          <Typography
            key={index}
            sx={{
              fontFamily: brand.fontFamily,
              fontSize: { xs: "1.4rem", md: "2rem" },
              fontWeight: 600,
              letterSpacing: 2,
              color: "#333",
              mx: { xs: 3, md: 6 },
              flexShrink: 0,
              transition: "transform 0.3s, color 0.3s",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.2)",
                color: "#000",
              },
            }}
          >
            {brand.name}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
