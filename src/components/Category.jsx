import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const products = [
  { image: "/images/cat1.JPG", category: "SHOP CLOTHES", section: "clothes" },
  { image: "/images/cat2.JPG", category: "SHOP BAGS", section: "bags" },
  { image: "/images/cat3.JPG", category: "SHOP SHOSE", section: "shoes" },
];

export default function Category() {
  const theme = useTheme();
  const navigate = useNavigate();

  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // موبايل
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // تابلت

  let cols = 3; // ديسكتوب
  if (isXs) cols = 1;
  else if (isSm) cols = 2;

  const handleClick = (section) => {
    navigate(`/shop?section=${section}`);
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <ImageList variant="quilted" cols={cols} gap={8}>
        {products.map((item, index) => (
          <ImageListItem key={index} sx={{ position: "relative" }}>
            <Box
              component="img"
              src={item.image}
              alt={item.category}
              loading="lazy"
              sx={{
                width: "100%",
                height: { xs: 300, sm: 400, md: "75vh" },
                objectFit: "cover",
              }}
            />
            <Button
              onClick={() => handleClick(item.section)}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                color: "black",
                fontWeight: 600,
                letterSpacing: 1,
                px: 4,
                py: 1.5,
                borderRadius: 0,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  boxShadow: "none",
                },
              }}
            >
              {item.category}
            </Button>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
