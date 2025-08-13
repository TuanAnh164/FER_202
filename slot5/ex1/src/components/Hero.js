import { Container } from "react-bootstrap";

function Hero() {
  return (
    <Container className="my-4 text-center">
      <div style={{ marginLeft: "24vw", marginRight: "24vw" }}>
        <h2 className="text-center mb-3">Explore our simple, healthy recipes</h2>
        <p className="text-center text-muted">
          Discover eight quick, whole-food dishes that fit real-life schedules and
          taste amazing. Use the search bar to find a recipe by name or ingredient,
          or simply scroll the list and let something delicious catch your eye.
        </p>
      </div>
    </Container>
  );
}

export default Hero;
