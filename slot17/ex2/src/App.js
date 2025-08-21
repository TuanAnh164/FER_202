import React, { useState } from "react";
import { CartProvider } from "./components/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import { SearchItem } from "./components/SearchItem";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";

const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    image: "images/uthappizza.png",
    price: "4.99",
    description: "A unique combination of Indian Uthappam and Italian pizza.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    image: "images/zucchipakoda.png",
    price: "1.99",
    description: "Deep fried Zucchini with chickpea batter.",
  },
  {
    id: 2,
    name: "Vadonut",
    image: "images/vadonut.png",
    price: "1.99",
    description: "A combination of vada and donut.",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    image: "images/elaicheesecake.png",
    price: "2.99",
    description: "New York Style Cheesecake with Indian cardamoms.",
  },
];

function App() {
  const [quickSearch, setQuickSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const appClass = darkMode ? "App bg-dark text-light min-vh-100" : "App bg-light text-dark min-vh-100";

  return (
    <div className={appClass}>
      <CartProvider>
        <Container className="py-4">
          {/* Search */}
          <SearchItem onQuickSearch={setQuickSearch} darkMode={darkMode} />

          {/* Dark mode toggle */}
          <div className="text-end m-3">
            <Button
              variant={darkMode ? "warning" : "dark"}
              onClick={toggleDarkMode}
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Button>
          </div>

          {/* Dishes */}
          <DishesList
            darkMode={darkMode}
            dishes={dishes.filter(
              (dish) =>
                dish.name.toLowerCase().includes(quickSearch.toLowerCase()) ||
                dish.description.toLowerCase().includes(quickSearch.toLowerCase())
            )}
          />

          {/* Cart */}
          <Cart darkMode={darkMode} />
        </Container>
      </CartProvider>
    </div>
  );
}

export default App;
