import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { House, Heart, ShoppingCart, LogIn, LogOut, CircleUser, Settings } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Badge } from "react-bootstrap";
import { useFavourites } from "../contexts/FavouriteContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { items: favouriteItems } = useFavourites();
  const navigate = useNavigate();

  const cartCount = items.reduce((s, it) => s + (it.qty || 0), 0);
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {user?.role === "admin" && (

        <header className="header " style={{ padding: "12px 20px", backgroundColor: "#000000", position: "sticky", top: 0, zIndex: 1000 }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <img src="/images/bikes/logo.jpg" alt="Logo" style={{ height: 40 }} onClick={() => navigate("/")} />
            <Link to="/"><House className="text-light" /></Link>
            <Link to="/manage-users" className="text-light"><Settings /></Link>
            <div style={{ marginLeft: "auto" }} className="d-flex align-items-center text-light gap-3">
              {!user ? (
                <>
                  <Link to="/login" style={{ marginRight: 12 }} className="text-light">
                    <LogIn />
                  </Link>
                  <Link to="/register" className="text-light"><CircleUser /></Link>
                </>
              ) : (
                <div style={{ display: "inline-flex", gap: 12, alignItems: "center" }}>
                  <span>Hi, {user.name || user.email}</span>
                  <LogOut onClick={handleLogout} />
                  <Link to="/profile" className="text-light"><CircleUser /></Link>

                </div>
              )}
            </div>
          </nav>
        </header>
      )}


      {(!user || user?.role !== "admin") && (<header className="header " style={{ padding: "12px 20px", backgroundColor: "#000000", position: "sticky", top: 0, zIndex: 1000 }}>
        <nav style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img src="/images/bikes/logo.jpg" alt="Logo" style={{ height: 40 }} onClick={() => navigate("/")} />
          <Link to="/"><House className="text-light" /></Link>
          <Link to="/wishlist" className="position-relative d-inline-flex align-items-center"><Heart className="text-light" />{favouriteItems.length > 0 && <Badge
            bg="danger"
            pill
            style={{
              position: "absolute",
              top: "-2px",
              right: "-17px",
              fontSize: "0.75rem",
            }}
          >
            {favouriteItems.length}
          </Badge>}</Link>
          <Link to="/cart" className="position-relative d-inline-flex align-items-center" ><ShoppingCart className="text-light" />
            {cartCount > 0 && <Badge
              bg="danger"
              pill
              style={{
                position: "absolute",
                top: "-2px",
                right: "-17px",
                fontSize: "0.75rem",
              }}
            >
              {cartCount}
            </Badge>}</Link>

          <div style={{ marginLeft: "auto" }} className="d-flex align-items-center text-light gap-3">
            {!user ? (
              <>
                <Link to="/login" style={{ marginRight: 12 }} className="text-light">
                  <LogIn />
                </Link>
                <Link to="/register" className="text-light"><CircleUser /></Link>
              </>
            ) : (
              <div style={{ display: "inline-flex", gap: 12, alignItems: "center" }}>
                <span>Hi, {user.name || user.email}</span>
                <LogOut onClick={handleLogout} />
                <Link to="/profile" className="text-light"><CircleUser /></Link>

              </div>
            )}
          </div>
        </nav>
      </header>
      )
      }
    </>
  );
}
