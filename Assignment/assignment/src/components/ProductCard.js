import { Card, Badge, Button } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import { useFavourites } from "../contexts/FavouriteContext";
import { Heart, ShoppingCart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../contexts/ToastContext";
import { useContext } from "react";
export default function ProductCard({ product }) {
    const { state, dispatch } = useContext(ToastContext);
    const { user, setRedirectAfterLogin } = useAuth();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { items, addToFavourites, removeFromFavourites } = useFavourites();
    const isFav = items.some((it) => String(it.id) === String(product.id));
    const onSale = typeof product.salePrice !== "undefined" && product.salePrice !== null;
    return (
        <>
            <Card className="h-100 shadow-sm text-center">
                <div className="position-relative">
                    <Card.Img variant="top" src={product.image} alt={product.title} style={{ objectFit: "cover", height: "200px" }} />
                    {Array.isArray(product.tags) && product.tags.includes("hot") && (
                        <Badge bg="danger" className="position-absolute top-0 start-0 m-2">HOT</Badge>
                    )}
                    {onSale && (
                        <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">SALE</Badge>
                    )}
                </div>
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.name}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        {product.salePrice ? (
                            <div className="fw-bold fs-5">
                                <span style={{ textDecoration: "line-through", color: "#888" }}>
                                    ${product.price}
                                </span>{" "}
                                <strong style={{ color: "red" }}>${product.salePrice}</strong>
                            </div>
                        ) : (
                            <div className="fw-bold fs-5">${product.price}</div>
                        )}

                        <div className="d-flex gap-3 align-items-center">
                            <Button onClick={() => navigate(`/product/${product.id}`)} variant="dark" size="sm" className="flex-grow-1">
                                View Details
                            </Button>
                          { user && user.role === "admin" && (
                            <Button onClick={() => navigate(`/update-product/${product.id}`)} variant="dark" size="sm" className="flex-grow-1">
                                Edit Product
                            </Button>
                          )}
                            { user && user.role !== "admin" && (
                                <>
                                    {isFav ? (
                                        <Heart
                                            className="text-danger "
                                            size={24}
                                            role="button"
                                            onClick={() => removeFromFavourites(product.id)}
                                            fill="currentColor"
                                        />
                                    ) : (
                                        <Heart
                                            className="text-dark"
                                            size={24}
                                            role="button"
                                            onClick={() => {
                                                if (user) {
                                                    addToFavourites(product);
                                                    dispatch({ type: "SHOW", message: "Item added to favourites." });
                                                } else {
                                                    setRedirectAfterLogin("/");
                                                    dispatch({ type: "SHOW", message: "Please log in to add items to favourites." });
                                                    navigate("/login");
                                                }
                                            }}
                                        />
                                    )
                                    }

                                    <ShoppingCart variant="primary" onClick={() => {
                                        if (user) {
                                            addToCart(product)
                                            dispatch({ type: "SHOW", message: "Item added to cart." });
                                        } else {
                                            setRedirectAfterLogin("/");
                                            dispatch({ type: "SHOW", message: "Please log in to add items to the cart." });
                                            navigate("/login");

                                        }
                                    }} />
                                </>
                            )
                            }
                        </div>
                    </div>
                </Card.Body>
            </Card>

        </>
    );
}
