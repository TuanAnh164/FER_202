import { Route, Routes, Navigate } from "react-router-dom";
import ProduductsPage from "../pages/ProductsPage";
import ProductDetails from "../pages/ProductDetails";
import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/CartPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/Motorbikes"
        element={<ProduductsPage  />}
      />
      <Route path="/Motorbikes/:id" element={<ProductDetails />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cart" element={<CartPage />} /> 
      <Route path="*" element={<h2>404 - Not Found</h2>} />
    </Routes>
  );
}
