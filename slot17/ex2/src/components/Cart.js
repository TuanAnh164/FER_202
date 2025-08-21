import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import {
  Card,
  ListGroup,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";

const Cart = ({ darkMode }) => {
  const [toast, setToast] = useState(false);
  const { cartItems, removeFromCart, clearCart, totalValue } =
    useContext(CartContext);

  const cardClass = darkMode ? "bg-dark text-light" : "bg-white text-dark";
  const listGroupItemClass = darkMode ? "bg-secondary text-light" : "";

  return (
    <Card className={`shadow-sm mt-3 ${cardClass}`}>
      <Card.Header
        as="h4"
        className={darkMode ? "bg-dark text-white" : "bg-primary text-light"}
      >
             Giỏ hàng
      </Card.Header>
      <Card.Body>
        {cartItems.length === 0 ? (
          <p className={darkMode ? "outline-light" : "primary"}>Giỏ hàng của bạn đang trống.</p>
        ) : (
          <>
            <ListGroup variant="flush" className="mb-3">
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className={`d-flex justify-content-between align-items-center ${listGroupItemClass}`}
                >
                  <div>
                    <strong>{item.name}</strong> – ${item.price}
                  </div>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Xóa
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="mb-3">
              <p className="mb-1">Tổng số món: {cartItems.length}</p>
              <p className="fw-bold">
                Tổng giá trị: ${totalValue().toFixed(2)}
              </p>
            </div>

            <div className="d-flex gap-2">
              <Button variant={darkMode ? "outline-light" : "primary"} onClick={clearCart}>
                Xóa giỏ hàng
              </Button>
              <Button
                variant={darkMode ? "outline-light" : "primary"}
                onClick={() => {
                  setToast(true);
                  clearCart();
                }}
              >
                 Xác nhận đơn hàng
              </Button>
            </div>
          </>
        )}
      </Card.Body>

      {/* Toast thông báo */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg={darkMode ? "dark" : "light"}
          show={toast}
          onClose={() => setToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Body className={darkMode ? "text-white" : "text-dark"}>
            🎉 Thanh toán thành công!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Card>
  );
};

export default Cart;
