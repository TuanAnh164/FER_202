import { Container, Row, Col, Card, Button, Badge, Alert } from "react-bootstrap";
import { useFavourites } from "../contexts/FavouriteContext";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../contexts/ToastContext";
import { useContext } from "react";

const money = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(n) || 0);

export default function FavouritePage() {
  const { state, dispatch } = useContext(ToastContext);
  const { items, removeFromFavourites } = useFavourites();
  const { addToCart } = useCart();
  const { user, setRedirectAfterLogin } = useAuth();
  const navigate = useNavigate();
  if (!items.length) {
    return (
      <Container className="py-4">
        <Alert variant="light" className="d-flex justify-content-between align-items-center">
          <div className="text-dark">List is empty.</div>
          <Button onClick={() => navigate("/")} variant="dark">Continue Shopping</Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0 text-light">
          Favourite {items.length}
        </h2>
        <Button onClick={() => navigate("/")} variant="outline-light" style={{ background: "#000000ff" }}>← Continue Shopping</Button>
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {items.map((p) => {
          const onSale = typeof p.salePrice !== "undefined" && p.salePrice !== null;
          return (
            <Col key={p.id}>
              <Card className="h-100 shadow-sm">
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={p.image}
                    alt={p.title}
                    style={{ height: 180, objectFit: "cover" }}
                    onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
                  />
                  {Array.isArray(p.tags) && p.tags.includes("hot") && (
                    <Badge bg="danger" className="position-absolute top-0 start-0 m-2">HOT</Badge>
                  )}
                  {onSale && (
                    <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">SALE</Badge>
                  )}
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-6 mb-1">{p.title}</Card.Title>
                  {p.name && <Card.Subtitle className="text-muted mb-2">{p.name}</Card.Subtitle>}

                  <div className="mb-3">
                    {onSale ? (
                      <>
                        <span className="text-muted text-decoration-line-through me-2">
                          {money(p.price)}
                        </span>
                        <span className="fw-bold text-danger">{money(p.salePrice)}</span>
                      </>
                    ) : (
                      <span className="fw-bold">{money(p.price)}</span>
                    )}
                  </div>

                  <div className="mt-auto d-flex gap-2">
                    <Button onClick={() => {
                      navigate(`/product/${p.id}`);
                    }} variant="dark" size="sm" className="flex-grow-1">
                      View Details
                    </Button>
                    <Heart
                      className="text-danger"
                      size={24}
                      role="button"
                      onClick={() => removeFromFavourites(p.id)}
                      fill="currentColor"
                    />
                    <ShoppingCart variant="primary" onClick={() => {
                      if (user) {
                        addToCart(p)
                        dispatch({ type: "SHOW", message: "Item added to cart." });
                      } else {
                        setRedirectAfterLogin("/");
                        dispatch({ type: "SHOW", message: "Please log in to add items to the cart." });
                        navigate("/login");

                      }
                    }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
