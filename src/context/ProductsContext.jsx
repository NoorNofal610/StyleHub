import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState({
    clothes: [],
    bags: [],
    shoes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [clothesRes, bagsRes, shoesRes] = await Promise.all([
          axios.get('https://dummyjson.com/products/category/womens-dresses'),
          axios.get('https://dummyjson.com/products/category/womens-bags'),
          axios.get('https://dummyjson.com/products/category/mens-shoes'),
        ]);
        setProducts({
          clothes: clothesRes.data.products,
          bags: bagsRes.data.products,
          shoes: shoesRes.data.products,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};
