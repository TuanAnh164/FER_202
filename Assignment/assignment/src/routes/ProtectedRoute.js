import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CartPage from "../pages/CartPage";
import FavouritePage from "../pages/FavouritePage";
import {CheckoutPage } from "../pages/CheckoutPage";
import ProductDetail from "../pages/ProductDetail";
import ProfilePage from "../pages/ProfilePage";
import ManageUser from "../pages/ManageUser";
import UpdateProductPage from "../pages/UpdateProductPage";
import AddProductPage from "../pages/AddProductPage";
export function ProtectedRoute() {
    return (<>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<FavouritePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/manage-users" element={<ManageUser />} />
            <Route path="/update-product/:id" element={<UpdateProductPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>

    </>);
}
