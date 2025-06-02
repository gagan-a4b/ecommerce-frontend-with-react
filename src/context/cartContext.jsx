import React, { createContext, useContext, useState, useEffect } from "react";
import { loadCartWithDetails } from "../api/cartApi";


const CartContext = createContext();


export const useCart = () => useContext(CartContext);


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = async () => {
    const result = await loadCartWithDetails();
    if (result.success) {
      setCartItems(result.data);
      const totalQuantity = result.data.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCartCount(totalQuantity);
    } else {
      console.error("Error loading cart:", result.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, setCartItems, setCartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};
