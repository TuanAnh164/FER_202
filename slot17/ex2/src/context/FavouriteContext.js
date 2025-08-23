import React, { createContext, useReducer, useEffect } from "react";
import { favouriteReducer, initialFavouriteState } from "../reducer/FavourriteReducer";

export const FavouriteContext = createContext();

export function FavouriteProvider({ children }) {
  // Lấy favourites từ localStorage (nếu có)
  const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || initialFavouriteState;

  const [state, dispatch] = useReducer(favouriteReducer, storedFavourites);

  // Actions
  const addToFavourites = (item) =>
    dispatch({ type: "ADD_FAVOURITE", payload: item });

  const removeFromFavourites = (itemId) =>
    dispatch({ type: "REMOVE_FAVOURITE", payload: itemId });

  // Lưu vào localStorage mỗi khi state thay đổi
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(state));
  }, [state]);

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
