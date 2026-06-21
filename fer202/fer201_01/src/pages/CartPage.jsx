// pages/CartPage.jsx
import React from "react";
import { useCart } from "../contexts/CartContext";
import { Button, Table } from "react-bootstrap";
const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + parseFloat(item.price.replace("$", "")) * item.quantity,
    0
  );
  return (
    <>
      {cart.length === 0 ? (
        <h4 className="text-center mt-4">🛒 Your cart is empty</h4>
      ) : (
        <div className="container mt-4">
          <h3>🛒 Shopping Cart</h3>
          <Table
            striped
            bordered
            hover
            responsive
            className="align-middle mt-3"
          >
            <thead className="table-light">
              <tr>
                <th>Model</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.model}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
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
                  </td>
                  <td>{parseFloat(item.price.replace("$", "")) * item.quantity}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4 className="text-end mt-3">
            Total:{" "}
            <span className="text-primary">{totalPrice}</span>
          </h4>
        </div>
      )}
    </>
  );
};

export default CartPage;
