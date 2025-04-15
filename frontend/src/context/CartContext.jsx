import React, { createContext, useState } from "react";

// Create a Context for the Cart
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to the cart
  const addToCart = (product) => {
    const productExist = cart.find((item) => item.id === product.id);
    if (productExist) {
      // If the product already exists, increase the quantity
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Otherwise, add the product to the cart with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove item from the cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Get total price of items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
