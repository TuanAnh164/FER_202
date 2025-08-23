import React, { useMemo, useState } from "react";
import DishesList from "./components/DishesList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { dishes } from "./data/dish";
import Carousels from "./components/Carousel";
import AppNavbar from "./components/Navbar";
import { useDarkMode } from "./context/DarkModeContext";
import Sort from "./components/Sort";
import { useNavigate } from "react-router-dom";
function App() {
  const [quickSearch, setQuickSearch] = useState("");
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [sortItem, setSortItem] = useState("title-asc");
  const appClass = darkMode ? "App bg-dark text-light min-vh-100" : "App bg-light text-dark min-vh-100";
  const navigate = useNavigate();
  return (
    <div className={appClass}>

      {/* Search */}
      <AppNavbar onQuickSearch={setQuickSearch} />

      {/* Dark mode toggle */}
      <div className="text-end m-3">
        <Button
          variant={darkMode ? "warning" : "dark"}
          onClick={toggleDarkMode}
        >
          {darkMode ? "☀️ Chế độ sáng" : "🌙 Chế độ tối"}
        </Button>
      </div>
      <Carousels />
      <Sort sortItem={sortItem} setSortItem={setSortItem} darkMode={darkMode} />
      {/* Dishes */}
      <DishesList
        darkMode={darkMode}
        dishes={useMemo(() => {
          if (quickSearch) {
            return dishes.filter(
              (dish) =>
                dish.name.toLowerCase().includes(quickSearch.toLowerCase()) ||
                dish.description.toLowerCase().includes(quickSearch.toLowerCase())
            );
          } if (sortItem) {
            return [...dishes].sort((a, b) => {
              if (sortItem === "title-asc") {
                return a.name.localeCompare(b.name);
              } else if (sortItem === "title-desc") {
                return b.name.localeCompare(a.name);
              } else if (sortItem === "price-asc") {
                return a.price - b.price;
              } else if (sortItem === "price-desc") {
                return b.price - a.price;
              }
            });
          }
          return dishes;
        })}
      />

      {/* Cart */}
      <Button variant={darkMode ? "outline-light" : "primary"} onClick={() => navigate("/cart")}>
        Giỏ hàng
      </Button>


    </div>
  );
}

export default App;
