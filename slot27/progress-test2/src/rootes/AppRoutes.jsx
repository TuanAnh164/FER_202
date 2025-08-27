import { Route, Routes } from "react-router-dom";
import ProduductsPage from "../pages/ProductsPage";
import ProductDetails from "../pages/ProductDetails"; // thêm
import LoginPage from "../pages/LoginPage"; // sẽ tạo ở bước 3
export default function AppRoutes({ user, setUser }) {
  return (
    <Routes>
      <Route path="/products" element={<ProduductsPage user={user} setUser={setUser} />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/login" element={<LoginPage setUser={setUser} />} />
    </Routes>
  );
}
