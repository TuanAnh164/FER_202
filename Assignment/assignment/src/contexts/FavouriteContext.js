// contexts/FavouriteContext.js
import React, { createContext, useReducer, useEffect, useContext } from "react";
import { favouriteReducer, initialFavouriteState } from "../reducers/FavourriteReducer";
import { apiPostWishlist, apiGetWishlist } from "../api/accounts";
import { useAuth } from "./AuthContext";

const FavouriteContext = createContext();

export function FavouriteProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(favouriteReducer, initialFavouriteState);

  // Hydrate wishlist từ server khi login
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (user) {
          const server = await apiGetWishlist(user.id);
          if (!cancelled) {
            dispatch({ type: "HYDRATE_FAVOURITES", payload: server ?? [] });
          }
        }
      } catch (err) {
        console.error("Hydrate wishlist failed:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  // Actions
  const addToFavourites = (item) =>
    dispatch({ type: "ADD_FAVOURITE", payload: item });

  const removeFromFavourites = (itemId) =>
    dispatch({ type: "REMOVE_FAVOURITE", payload: itemId });

  
  // Persist wishlist lên server khi thay đổi
  useEffect(() => {
    if (!user) return;
    const t = setTimeout(() => {
      (async () => {
        try {
          await apiPostWishlist(user.id, state.items);
        } catch (err) {
          console.error("Persist wishlist failed:", err);
        }
      })();
    }, 300);
    return () => clearTimeout(t);
  }, [user?.id, state.items]);

  return (
    <FavouriteContext.Provider
      value={{
        items: state.items,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
}

// Custom hook
export function useFavourites() {
  const ctx = useContext(FavouriteContext);
  if (!ctx) throw new Error("useFavourites must be used within FavouriteProvider");
  return ctx;
}
