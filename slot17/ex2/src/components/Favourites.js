import { useContext } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FavouriteContext } from "../context/FavouriteContext";
import { useNavigate } from "react-router-dom";
import AppNavbar from "./Navbar";

export default function Favourites({ darkMode }) {
  const { items, removeFromFavourites } = useContext(FavouriteContext);
  const navigate = useNavigate();
  const appClass = darkMode ? "App bg-dark text-light min-vh-100" : "App bg-light text-dark min-vh-100";

  return (
    <>
      <AppNavbar darkMode={darkMode} />
      <div className={appClass}>
        <Container >
        <h2 className={darkMode ? "text-light" : "text-dark"}>My Favourites</h2>
        <Row>
          {items.length === 0 ? (
            <p className={darkMode ? "text-light" : "text-dark"}>
              Bạn chưa có món nào trong danh sách yêu thích.
              <Button
                variant={darkMode ? "outline-light" : "primary"}
                onClick={() => navigate("/")} >Quay lại trang chủ</Button>
            </p>
          ) : (
            items.map((dish) => (
              <Col key={dish.id} md={4} className="mb-4">
                <Card className={darkMode ? "bg-dark text-light" : "shadow-sm"}>
                  <Card.Img
                    variant="top"
                    src={`/${dish.image}`}
                    alt={dish.name}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <Card.Body>
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Text>{dish.description}</Card.Text>
                    <Card.Text>
                      <strong>${parseFloat(dish.price).toFixed(2)}</strong>
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant={darkMode ? "outline-light" : "primary"}
                        onClick={() => navigate(`/dish/${dish.id}`)}
                      >
                        View Detail
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => removeFromFavourites(dish.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
          <Button
            variant={darkMode ? "outline-light" : "primary"}
            onClick={() => window.location.href = "/"}
          >
            Quay lại trang chủ
          </Button>
        </Row>
      </Container>
      </div>
    </>
  );
}
