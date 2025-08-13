import React, { useState } from "react";
import AppNavbar from "./components/Navbar";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import RecipeGrid from "./components/RecipeGrid";
import Footer from "./components/Footer";
import recipesData from "./components/recipes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Carousel } from "bootstrap/dist/js/bootstrap.bundle.min";
import Carousels from "./components/Carousels";
import { Routes, Route } from "react-router-dom";
import RecipeRequestForm from "./components/Form";
function App() {
  const [search, setSearch] = useState("");
  const [maxPrep, setMaxPrep] = useState("");
  const [maxCook, setMaxCook] = useState("");
  const [sortOption, setSortOption] = useState("");

  const filteredRecipes = recipesData.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesPrep = maxPrep ? recipe.prep <= parseInt(maxPrep) : true;
    const matchesCook = maxCook ? recipe.cook <= parseInt(maxCook) : true;
    return matchesSearch && matchesPrep && matchesCook;
  });

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    switch (sortOption) {
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "prep-asc":
        return a.prep - b.prep;
      case "prep-desc":
        return b.prep - a.prep;
      case "cook-asc":
        return a.cook - b.cook;
      case "cook-desc":
        return b.cook - a.cook;
      default:
        return 0;
    }
  });

  return (
    <>
      <Routes>
        <Route path="/request" element={<><AppNavbar />
          <RecipeRequestForm />
        </>} />
        <Route
          path="/"
          element={
            <>
              {" "}
              <AppNavbar />
              <Carousels />
              <Hero />
              <div className="container my-4">
                <Filters
                  maxPrep={maxPrep}
                  setMaxPrep={setMaxPrep}
                  maxCook={maxCook}
                  setMaxCook={setMaxCook}
                  search={search}
                  setSearch={setSearch}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                />

                <RecipeGrid recipes={sortedRecipes} />
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
