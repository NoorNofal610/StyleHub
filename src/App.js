import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Login from './components/Login';
import Cart from './pages/Cart';

export default function App() {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  //add/delete from favorit
  const handleToggleFavorite = (product) => {
    setFavoriteItems(prev => 
      prev.find(p => p.id === product.id) 
        ? prev.filter(p => p.id !== product.id) 
        : [...prev, product]
    );
  };

  // add to cart
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(p => p.id === product.id && p.size === product.size);
      if (existingIndex !== -1) {
        // increse quantity
        const updatedCart = [...prev];
        updatedCart[existingIndex].quantity += product.quantity;
        return updatedCart;
      } else {
        return [...prev, product];
      }
    });
  };

  // delete comp from cart
  const handleRemoveCartItem = (product) => {
    setCartItems(prev => prev.filter(p => !(p.id === product.id && p.size === product.size)));
  };

  // component quantity in cart
  const handleQuantityChange = (id, size, newQuantity) => {
    setCartItems(prev =>
      prev.map(p => 
        p.id === id && p.size === size ? { ...p, quantity: newQuantity } : p
      )
    );
  };

  return (
    <BrowserRouter>
      <Navbar
        favoriteItems={favoriteItems}
        onToggleFavorite={handleToggleFavorite}
        cartItems={cartItems}
        onRemoveCartItem={handleRemoveCartItem}
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              favoriteItems={favoriteItems} 
              onToggleFavorite={handleToggleFavorite} 
            />
          } 
        />
        <Route 
          path="/shop" 
          element={
            <Shop 
              favoriteItems={favoriteItems} 
              onToggleFavorite={handleToggleFavorite} 
              onAddToCart={handleAddToCart} 
            />
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <ProductDetail 
              onAddToCart={handleAddToCart} 
              onToggleFavorite={handleToggleFavorite} 
              favoriteItems={favoriteItems} 
            />
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/cart"
          element={
            <Cart 
              cartItems={cartItems} 
              onRemoveCartItem={handleRemoveCartItem} 
              onQuantityChange={handleQuantityChange} 
              setCartItems={setCartItems}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
