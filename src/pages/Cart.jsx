// // src/pages/Cart.jsx
// import React, { useState } from 'react';
// import { Box, Typography, Container, Button } from '@mui/material';
// import CartItem from '../components/CartItem';

// export default function Cart({ cartItems, onRemoveCartItem, onUpdateQuantity }) {
//   const [quantities, setQuantities] = useState(
//     cartItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
//   );

//   const handleQuantityChange = (product, qty) => {
//     if (qty < 1) return;
//     setQuantities(prev => ({ ...prev, [product.id]: qty }));
//     if (onUpdateQuantity) onUpdateQuantity(product, qty);
//   };

//   const totalPrice = cartItems.reduce((sum, item) => sum + item.price * (quantities[item.id] || 1), 0);

//   if (cartItems.length === 0) {
//     return (
//       <Container sx={{ py: 10 }}>
//         <Typography variant="h5" textAlign="center">Your cart is empty</Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container sx={{ py: 5 }}>
//       <Typography variant="h4" gutterBottom>Shopping Cart</Typography>

//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//         {cartItems.map(item => (
//           <CartItem
//             key={item.id}
//             product={item}
//             quantity={quantities[item.id]}
//             onRemove={onRemoveCartItem}
//             onQuantityChange={handleQuantityChange}
//           />
//         ))}
//       </Box>

//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
//         <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
//         <Button variant="contained" sx={{ backgroundColor: '#FDC65B', '&:hover': { backgroundColor: '#e6b953' } }}>
//           Checkout
//         </Button>
//       </Box>
//     </Container>
//   );
// }
