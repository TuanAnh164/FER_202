import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";
import { Card, Button, Row, Col } from "react-bootstrap";

const DishesList = ({ darkMode, dishes }) => {
  const { addToCart } = useContext(CartContext);

  const cardClass = darkMode ? "bg-dark text-light" : "bg-white text-dark";

  return (
    <div>
      <h2 className="mb-4">Danh sách món ăn</h2>
      <Row xs={1} md={4} className="g-4">
        {dishes.map((dish) => (
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
                <Button
                  variant={darkMode ? "outline-light" : "primary"}
                  onClick={() => addToCart(dish)}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
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
