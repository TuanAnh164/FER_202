import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
  Card,
  ListGroup,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { ToastContext } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AppNavbar from "./Navbar";

const Cart = ({ darkMode }) => {
  const { state, dispatch } = useContext(ToastContext);
  const { items, removeFromCart, decreaseItem, addToCart, clearCart, totalValue } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const cardClass = darkMode ? "bg-dark text-light" : "bg-white text-dark";
  const listGroupItemClass = darkMode ? "bg-secondary text-light" : "";

  return (
    <><AppNavbar />
      <Card className={`shadow-sm mt-3 ${cardClass}`}>
        <Card.Header
          as="h4"
          className={darkMode ? "bg-dark text-white" : "bg-primary text-light"}
        >
          Giỏ hàng
        </Card.Header>
        <Card.Body>
          {items.length === 0 ? (
            <p className={darkMode ? "text-light" : "text-dark"}>
              Giỏ hàng của bạn đang trống.
            </p>
          ) : (
            <>
              <ListGroup variant="flush" className="mb-3">
                {items.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    className={`d-flex justify-content-between align-items-center ${listGroupItemClass}`}
                  >
                    <div>
                      <strong>{item.name}</strong> – ${item.price}
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <div>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => decreaseItem(item.id)}
                        >
                          -
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => addToCart(item)}
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="mb-3">
                <p className="mb-1">Tổng số món: {items.length}</p>
                <p className="fw-bold">
                  Tổng giá trị: ${totalValue().toFixed(2)}
                </p>
              </div>

              <div className="d-flex flex-wrap gap-2">
                <Button
                  variant={darkMode ? "outline-light" : "secondary"}
                  onClick={() => navigate("/")}
                >
                  Tiếp tục mua hàng
                </Button>
                <Button
                  variant={darkMode ? "outline-light" : "primary"}
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                      dispatch({ type: "SHOW", payload: "⚠️ Bạn cần đăng nhập để thanh toán!" });
                    } else {
                      navigate("/checkout");
                    }
                  }}
                >
                  Thanh toán
                </Button>
                <Button variant={darkMode ? "outline-light" : "danger"} onClick={clearCart}>
                  Xóa giỏ hàng
                </Button>
                <Button
                  variant={darkMode ? "outline-light" : "success"}
                  onClick={() => {
                    clearCart();
                    dispatch({ type: "SHOW", payload: "✅ Đặt hàng thành công!" });
                  }}
                >
                  Xác nhận đơn hàng
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
      <Button variant={darkMode ? "outline-light" : "primary"} onClick={() => window.location.href = "/"}>
        Quay lại trang chủ
      </Button>
      {/* Toast thông báo */}
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
    </>
  );
};

export default Cart;
