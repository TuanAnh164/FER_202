import React, { useState } from "react";
import AppNavbar from "./components/Navbar";
import Hero from "./components/Hero";
import Filters from "./components/Filters";
import RecipeGrid from "./components/RecipeGrid";
import Footer from "./components/Footer";
import recipesData from "./components/recipes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [search, setSearch] = useState("");
  const [maxPrep, setMaxPrep] = useState("");
  const [maxCook, setMaxCook] = useState("");

  const filteredRecipes = recipesData.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase());
    const matchesPrep = maxPrep ? recipe.prep <= parseInt(maxPrep) : true;
    const matchesCook = maxCook ? recipe.cook <= parseInt(maxCook) : true;
    return matchesSearch && matchesPrep && matchesCook;
  });

  return (
    <>
      <AppNavbar />
      <Hero />
      <div className="container my-4">
        <Filters
          maxPrep={maxPrep}
          setMaxPrep={setMaxPrep}
          maxCook={maxCook}
          setMaxCook={setMaxCook}
          search={search}
          setSearch={setSearch}
        />
        <RecipeGrid recipes={filteredRecipes} />
      </div>
      <Footer />
    </>
  );
}

export default App;
