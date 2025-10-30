// // src/components/CartItem.jsx
// import React from 'react';
// import { Box, Typography, IconButton, TextField } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

// export default function CartItem({ product, quantity = 1, onRemove, onQuantityChange }) {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         borderBottom: '1px solid #ddd',
//         py: 1.5,
//       }}
//     >
//       {/* صورة مصغرة */}
//       <Box sx={{ width: 80, height: 80, mr: 2 }}>
//         <img
//           src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/80'}
//           alt={product.title}
//           style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//         />
//       </Box>

//       {/* معلومات المنتج */}
//       <Box sx={{ flexGrow: 1 }}>
//         <Typography variant="subtitle1" noWrap>{product.title}</Typography>
//         <TextField
//           type="number"
//           value={quantity}
//           onChange={(e) => onQuantityChange(product, parseInt(e.target.value))}
//           size="small"
//           sx={{ width: 60, mt: 1 }}
//           inputProps={{ min: 1 }}
//         />
//       </Box>

//       {/* السعر وزر الحذف */}
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//         <Typography variant="subtitle1">${product.price}</Typography>
//         <IconButton onClick={() => onRemove(product)}>
//           <DeleteIcon />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// }
