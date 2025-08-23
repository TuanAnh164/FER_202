import {
    Card, Button, Toast,
    ToastContainer,
} from "react-bootstrap";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FavouriteContext } from "../context/FavouriteContext";
import { dishes } from "../data/dish";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContext } from "../context/ToastContext";

export const ViewDetail = ({ darkMode }) => {
    const { id } = useParams();
    const dish = dishes.find(d => d.id === parseInt(id));
    const cardClass = darkMode ? "bg-dark text-light" : "bg-white text-dark";
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const { items, favouriteItems, addToFavourites, removeFromFavourites } =
        useContext(FavouriteContext);
    const isFavourite = items.some(fav => fav.id === dish.id);
    const { state, dispatch } = useContext(ToastContext);
    return (
        <div>
            <Card className={`h-100 shadow-sm ${cardClass}`}>
                <Card.Img
                    variant="top"
                    src={`/${dish.image}`}
                    alt={dish.name}
                    style={{ objectFit: "cover", height: "535px" }}
                />
                <Card.Body>
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Text>{dish.description}</Card.Text>
                    <Card.Text>
                        <strong>${parseFloat(dish.price).toFixed(2)}</strong>
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        <Button
                            variant={
                                isFavourite
                                    ? (darkMode ? "danger" : "outline-danger")
                                    : (darkMode ? "outline-light" : "primary")
                            }
                            onClick={() =>
                                isFavourite ? removeFromFavourites(dish.id) : addToFavourites(dish)
                            }
                        >
                            {isFavourite ? " Remove from Favourites" : " Add to Favourites"}
                        </Button>
                        <Button onClick={() => navigate(`/`)} variant={darkMode ? "outline-light" : "primary"}>
                            Back to Dishes
                        </Button>
                        <Button
                            variant={darkMode ? "outline-light" : "primary"}
                            onClick={() => {
                                addToCart(dish)
                                dispatch({ type: "SHOW", payload: "🛒 Thêm vào giỏ hàng thành công!" });
                            }}
                        >
                            Add to Cart
                        </Button>
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
                    </div>
                </Card.Body>
            </Card>
        </div >
    );
};
