import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import PropTypes from "prop-types";
import {
  Card, Button, Row, Col, Toast,
  ToastContainer,
} from "react-bootstrap";
import { FavouriteContext } from "../context/FavouriteContext";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../context/ToastContext";

const DishesList = ({ darkMode, dishes }) => {
  const { state, dispatch } = useContext(ToastContext);
  const { addToCart } = useContext(CartContext);
  const cardClass = darkMode ? "bg-dark text-light" : "bg-white text-dark";
  const { items, addToFavourites } = useContext(FavouriteContext);
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="mb-4">Danh sách món ăn</h2>
      <Row xs={1} md={4} className="g-4">
        {dishes.map((dish) => {
          const isFavourite = items.some(fav => fav.id === dish.id);

          return (
            <Col key={dish.id}>
              <Card className={`h-100 shadow-sm ${cardClass}`}>
                <Card.Img
                  variant="top"
                  src={dish.image}
                  alt={dish.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <Card.Body>
                  <Card.Title>{dish.name}</Card.Title>
                  <Card.Text>{dish.description}</Card.Text>
                  <Card.Text>
                    <strong>${parseFloat(dish.price).toFixed(2)}</strong>
                  </Card.Text>
                  <div className="d-flex flex-column gap-2">
                    {/* FAVOURITE BUTTON */}
                    <Button
                      variant={
                        isFavourite
                          ? (darkMode ? "success" : "outline-success")
                          : (darkMode ? "outline-light" : "primary")
                      }
                      onClick={() => {
                        if (isFavourite) {
                          navigate("/favourites"); // đã có -> sang trang favourites
                        } else {
                          addToFavourites(dish); // thêm mới
                          dispatch({ type: "SHOW", payload: "⭐ Added to favourites!" });
                        }
                      }}
                    >
                      {isFavourite ? "Browse to My Favourites" : "Add to Favourites"}
                    </Button>

                    {/* VIEW DETAIL */}
                    <Button onClick={() => navigate(`/dish/${dish.id}`)} variant={darkMode ? "outline-light" : "primary"}>
                      View Details
                    </Button>

                    {/* ADD TO CART */}
                    <Button
                      variant={darkMode ? "outline-light" : "primary"}
                      onClick={() => {
                        addToCart(dish);
                        dispatch({ type: "SHOW", payload: "🛒 Thêm vào giỏ hàng thành công!" });
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>

                  {/* TOAST */}
                  <ToastContainer
                    position="bottom-end"
                    className="p-3"
                    style={{
                      position: "fixed",
                      bottom: 0,
                      right: 0,
                      zIndex: 9999,
                    }}
                  >
                    <Toast
                      bg={darkMode ? "dark" : "light"}
                      show={state.show}
                      onClose={() => dispatch({ type: "HIDE" })}
                      delay={3000}
                      autohide
                    >
                      <Toast.Body className={darkMode ? "text-white" : "text-dark"}>
                        {state.message}
                      </Toast.Body>
                    </Toast>
                  </ToastContainer>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

DishesList.propTypes = {
  darkMode: PropTypes.bool,
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DishesList;
