import { Card, Badge, Button } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import { useFavourites } from "../contexts/FavouriteContext";
import { Heart, ShoppingCart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContext } from "../contexts/ToastContext";
import { useContext, useMemo } from "react";
import { useProducts } from "../contexts/ProductContext";

const money = n => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(n) || 0);

export default function ProductDetail() {
  const { products } = useProducts();                // mảng
  const { id } = useParams();                        // string
  const { dispatch } = useContext(ToastContext);
  const { user, setRedirectAfterLogin } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { items: favItems, addToFavourites, removeFromFavourites } = useFavourites();

  // Tìm product theo id
  const p = useMemo(() => Array.isArray(products) ? products.find(x => String(x.id) === String(id)) : null, [products, id]);
  if (!p) return <div className="alert alert-light my-4">Product not found.</div>;

  const onSale = p.salePrice != null;
  const isFav = Array.isArray(favItems) && favItems.some(it => String(it.id) === String(p.id));

  const requireLogin = (ok, msgOk, msgNeed) => {
    if (user) {
      ok();
      dispatch({ type: "SHOW", message: msgOk });
    } else {
      setRedirectAfterLogin(`/product/${p.id}`);
      dispatch({ type: "SHOW", message: msgNeed });
      navigate("/login");
    }
  };

  return (
    <div className="py-4">
      <Card className=" shadow-sm">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch">
          {/* Ảnh */}
          <div className="position-relative" style={{ minWidth: 280 }}>
            <Card.Img
              variant="top"
              src={p.image}
              alt={p.title}
              loading="lazy"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
            {Array.isArray(p.tags) && p.tags.includes("hot") && (
              <Badge bg="danger" className="position-absolute top-0 start-0 m-2">HOT</Badge>
            )}
            {onSale && (
              <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">SALE</Badge>
            )}
          </div>

          {/* Nội dung */}
          <Card.Body className="w-100">
            <Card.Title className="text-start">{p.title}</Card.Title>
            <Card.Text className="text-start text-muted">{p.name}</Card.Text>
            <div className="text-start py-2">
              <strong>Description:</strong> {p.description}
            </div>

            <div className="text-end">
              {onSale ? (
                <div className="fw-bold fs-5">
                  <span style={{ textDecoration: "line-through", color: "#888" }}>{money(p.price)}</span>{" "}
                  <strong style={{ color: "red" }}>{money(p.salePrice)}</strong>
                </div>
              ) : (
                <div className="fw-bold fs-5">{money(p.price)}</div>
              )}
            </div>


            {/* Nhóm icon căn phải */}
            <div className="d-flex justify-content-end gap-3 py-2">
              {user && user.role !== "admin" && (
                <>
                  {isFav ? (
                    <Heart
                      className="text-danger "
                      size={24}
                      role="button"
                      onClick={() => removeFromFavourites(p.id)}
                      fill="currentColor"
                    />
                  ) : (
                    <Heart
                      className="text-dark"
                      size={24}
                      role="button"
                      onClick={() => {
                        if (user) {
                          addToFavourites(p);
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
                      addToCart(p)
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
          </Card.Body>
        </div>
      </Card>
      <div className="d-flex justify-content-end mt-3 px-4">
        <Button variant="dark" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
