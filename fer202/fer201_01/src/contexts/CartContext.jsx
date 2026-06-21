// context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

 const removeFromCart = (id) => {
  setCart((prev) => {
    return prev
      .map((item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            // nếu còn nhiều hơn 1 thì giảm số lượng
            return { ...item, quantity: item.quantity - 1 };
          }
          // nếu chỉ còn 1 thì trả về null (sẽ bị xóa sau filter)
          return null;
        }
        return item;
      })
      .filter((item) => item !== null); // loại bỏ những item null
  });
};


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
