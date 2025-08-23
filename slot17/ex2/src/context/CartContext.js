// context/CartContext.js
import React, { createContext, useReducer, useEffect } from "react";
import { cartReducer, initialCartState } from "../reducer/CartReducer";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Actions
  const addToCart = (item) => dispatch({ type: "ADD_ITEM", payload: item });
  const decreaseItem = (itemId) => dispatch({ type: "DECREASE_ITEM", payload: itemId });
  const removeFromCart = (itemId) => dispatch({ type: "REMOVE_ITEM", payload: itemId });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalValue = () =>
    state.items.reduce((total, item) => total + item.quantity * parseFloat(item.price), 0);

  // Load from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCart) {
      dispatch({ type: "LOAD_CART", payload: savedCart });
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        decreaseItem,
        removeFromCart,
        clearCart,
        totalValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
