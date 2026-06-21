import { Route, Routes } from "react-router-dom";
import ProduductsPage from "../pages/ProductsPage";
import ProductDetails from "../pages/ProductDetails";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/HomePage"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<ProduductsPage />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<h2>404 - Not Found</h2>} />
    </Routes>
  );
}
