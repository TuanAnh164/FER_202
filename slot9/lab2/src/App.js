import React, { useState, useEffect } from "react";
import AppNavbar from "./components/Navbar";
import Filters from "./components/Filters";
import MovieGrid from "./components/MovieGrid";
import Footer from "./components/Footer";
import { movies } from "./components/movie";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Carousels from "./components/Carousels";
import { Routes, Route } from "react-router-dom";
import RecipeRequestForm from "./components/Form";
import MyFavourites from "./components/MyFavourites";
function App() {
  const [search, setSearch] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [maxYear, setMaxYear] = useState(""); 
  const [sortOption, setSortOption] = useState("");
  const [genre, setGenre] = useState("All");
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(favs);
  }, []);
  const toggleFavourite = (id) => {
    setFavourites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((fid) => fid !== id)
        : [...prev, id];
      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    });
  };
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesDuration = maxDuration ? movie.duration <= parseInt(maxDuration) : true;
    const matchesMaxYear = maxYear ? movie.year <= parseInt(maxYear) : true;
    const matchesGenre = genre === "All" || movie.genre.includes(genre);
    return matchesSearch && matchesDuration && matchesMaxYear && matchesGenre;
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortOption) {
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "duration-asc":
        return a.duration - b.duration;
      case "duration-desc":
        return b.duration - a.duration;
      case "year-asc":
        return a.year - b.year;
      case "year-desc":
        return b.year - a.year;
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
        <Route path="/favourites" element={<MyFavourites
          movies={movies}
          favourites={favourites}
          toggleFavourite={toggleFavourite}
        />} />
        <Route
          path="/"
          element={
            <>
              <AppNavbar />
              <Carousels />
              <div className="container my-4">
                <Filters
                  maxDuration={maxDuration}
                  setMaxDuration={setMaxDuration}
                  maxYear={maxYear}
                  setMaxYear={setMaxYear}
                  search={search}
                  setSearch={setSearch}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                  genre={genre}
                  setGenre={setGenre}
                />
                <MovieGrid
                  movies={sortedMovies}
                  favourites={favourites}
                  toggleFavourite={toggleFavourite}
                /></div>
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
