import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "../src/router/Router";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import { FavouriteProvider } from "./context/FavouriteContext";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DarkModeProvider>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <FavouriteProvider>
              <AppRouter />
            </FavouriteProvider>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </DarkModeProvider>
);
