// src/contexts/CartContext.js
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { apiCreateOrder } from "../api/order"; // LƯU Ý: 'orders' (số nhiều)
import { cartReducer, initialCartState } from "../reducers/cartReducer";

const LS_KEY = "cart_items_v1";
const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, init);

 // Restore
function init(initialState) {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return { items: parsed };
      }
    }
  } catch {}
  return initialState;
}


// Persist
useEffect(() => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state.items));
  } catch {}
}, [state.items]);


  // Derived
  const count = useMemo(
    () => state.items.reduce((s, it) => s + (it.qty || 0), 0),
    [state.items]
  );

  const subtotal = useMemo(
    () => state.items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 0), 0),
    [state.items]
  );

  // Actions
  const addToCart = useCallback((product) => {
    dispatch({ type: "ADD", payload: product });
  }, []);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: "REMOVE", payload: id });
  }, []);

  const incQty = useCallback((id) => {
    dispatch({ type: "INC", payload: id });
  }, []);

  const decQty = useCallback((id) => {
    dispatch({ type: "DEC", payload: id });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const [address, setAddress] = useState("");

  // Checkout -> lưu order vào db.json (json-server)
  const checkout = useCallback(
    async (userId) => {
      if (!userId) throw new Error("Please sign in to checkout");
      if (state.items.length === 0) throw new Error("Your cart is empty");

      const order = {
        // không gửi id -> json-server tự sinh
        userid: userId,
        items: state.items,
        total: subtotal,
        date: new Date().toISOString(),
        address: address|| "",
      };

      const created = await apiCreateOrder(order);
      dispatch({ type: "CLEAR" });
      return created;
    },
    [state.items, subtotal]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      count,
      subtotal,
      addToCart,
      removeFromCart,
      incQty,
      decQty,
      clearCart,
      checkout,
      setAddress,
    }),
    [state.items, count, subtotal, addToCart, removeFromCart, incQty, decQty, clearCart, checkout, setAddress]
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
