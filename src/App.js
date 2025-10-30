import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Login from './components/Login';

export default function App() {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const handleToggleFavorite = (product) => {
    setFavoriteItems(prev => 
      prev.find(p => p.id === product.id) 
        ? prev.filter(p => p.id !== product.id) 
        : [...prev, product]
    );
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => prev.find(p => p.id === product.id) ? prev : [...prev, product]);
  };

  const handleRemoveCartItem = (product) => {
    setCartItems(prev => prev.filter(p => p.id !== product.id));
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
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
