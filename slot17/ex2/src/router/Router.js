import { Routes, Route } from "react-router-dom";
import App from "../App";
import DishRequestForm from "../components/Form";
import { ViewDetail } from "../components/ViewDetail";
import { useDarkMode } from "../context/DarkModeContext";
import Register from "../components/Register";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Favourites from "../components/Favourites";
import Cart from "../components/Cart";

function AppRouter() {

    const { darkMode } = useDarkMode();
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/dish/:id" element={<ViewDetail darkMode={darkMode} />} />
            <Route path="/request" element={<DishRequestForm />} />
            <Route path="/register" element={<Register darkMode={darkMode}  />} />
            <Route path="/login" element={<Login darkMode={darkMode}  />} />
            <Route path="/profile" element={<Profile darkMode={darkMode} />} />
            <Route path="/favourites" element={<Favourites darkMode={darkMode} />} />
            <Route path="/cart" element={<Cart darkMode={darkMode} />} />
        </Routes>
    );
}

export default AppRouter;
