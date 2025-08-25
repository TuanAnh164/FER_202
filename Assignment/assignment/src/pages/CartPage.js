import { Container, Row, Col, Table, Button, ButtonGroup, Image, Badge, Alert, Card, Stack } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const formatCurrency = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n || 0);

export default function CartPage() {
  const { items, subtotal, incQty, decQty, removeFromCart, clearCart } = useCart();

  if (!items.length) {
    return (
      <Container className="py-4">
        <Alert variant="secondary" className="d-flex justify-content-between align-items-center">
          <div>Your cart is empty.</div>
          <Button as={Link} to="/" variant="dark">Continue Shopping</Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col>
          <h2 className="mb-0 text-light">Your Cart <Badge bg="secondary">{items.reduce((s, i) => s + (i.qty || 0), 0)}</Badge></h2>
        </Col>
        <Col className="text-end">
          <Button variant="outline-light" onClick={clearCart}>Clear Cart</Button>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: 80 }}>Image</th>
                <th>Product</th>
                <th className="text-end" style={{ width: 140 }}>Price</th>
                <th className="text-center" style={{ width: 180 }}>Quantity</th>
                <th className="text-end" style={{ width: 140 }}>Total</th>
                <th className="text-center" style={{ width: 100 }}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => {
                const line = (Number(it.price) || 0) * (Number(it.qty) || 0);
                return (
                  <tr key={it.id}>
                    <td>
                      <Image
                        src={it.image}
                        alt={it.title}
                        rounded
                        style={{ width: 64, height: 64, objectFit: "cover" }}
                        onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
                      />
                    </td>
                    <td>
                      <div className="fw-semibold">{it.title}</div>
                      {it.name ? <div className="text-muted small">{it.name}</div> : null}
                    </td>
                    <td className="text-end">{formatCurrency(it.price)}</td>
                    <td className="text-center">
                      <ButtonGroup aria-label="Quantity">
                        <Button variant="outline-secondary" onClick={() => decQty(it.id)}>-</Button>
                        <Button variant="light" disabled style={{ minWidth: 56 }}>{it.qty}</Button>
                        <Button variant="outline-secondary" onClick={() => incQty(it.id)}>+</Button>
                      </ButtonGroup>
                    </td>
                    <td className="text-end fw-semibold">{formatCurrency(line)}</td>
                    <td className="text-center">
                      <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(it.id)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="table-light">
              <tr>
                <td colSpan={4} className="text-end fw-semibold">Subtotal:</td>
                <td className="text-end fw-bold">{formatCurrency(subtotal)}</td>
                <td />
              </tr>
            </tfoot>
          </Table>
        </Card.Body>
      </Card>

      <Stack direction="horizontal" gap={2} className="justify-content-between mt-3">
        <Button as={Link} to="/" variant="outline-light">
          ← Continue Shopping
        </Button>
        <div className="d-flex align-items-center gap-3">
          <div className="fw-semibold text-light">Total: <span className="fs-5">{formatCurrency(subtotal)}</span></div>
          <Button as={Link} to="/checkout" variant="primary">Checkout</Button>
        </div>
      </Stack>
    </Container>
  );
}
