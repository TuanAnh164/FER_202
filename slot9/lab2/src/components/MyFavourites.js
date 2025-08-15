
import { Container, Alert } from "react-bootstrap";
import MovieGrid from "./MovieGrid";
import AppNavbar from "./Navbar";
function MyFavourites({ movies, favourites, toggleFavourite }) {
  const favouriteMovies = movies.filter((m) => favourites.includes(m.id));

  return (
    <div>
      <AppNavbar />
      <Container className="my-4">
        <h2>My Favourite Movies</h2>
        {favouriteMovies.length === 0 ? (
          <Alert variant="info">No favourites yet.</Alert>
        ) : (
        <MovieGrid
          movies={favouriteMovies}
          favourites={favourites}
          toggleFavourite={toggleFavourite}
        />
      )}
    </Container>
  </div>
  );
}

export default MyFavourites;
