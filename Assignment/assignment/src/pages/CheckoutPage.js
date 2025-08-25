import { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Table, Badge, Alert, Button, ListGroup, Form } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { ToastContext } from "../contexts/ToastContext";
import { useContext } from "react";


const money = (n) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(n) || 0);

export function CheckoutPage() {
    const { items, subtotal, checkout, setAddress } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { state, dispatch } = useContext(ToastContext);

    // Giả lập phí
    const shipping = useMemo(() => (subtotal > 0 ? 10 : 0), [subtotal]);
    const tax = useMemo(() => Math.round(subtotal * 0.08 * 100) / 100, [subtotal]); // 8%
    const grandTotal = useMemo(() => subtotal + shipping + tax, [subtotal, shipping, tax]);
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        const newErrors = {};
        if (!street.trim()) newErrors.street = "Street Address is required";
        if (!city.trim()) newErrors.city = "City is required";
        if (!country.trim()) newErrors.country = "Country is required";

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setAddress({ street, city, country });
            return true;
        }
        return false;
    }
    console.log("Address set:", { street, city, country });
    const placeOrder = async (e) => {
        e.preventDefault();
        try {
            if (!user) {
                dispatch({ type: "SHOW", message: "Please sign in to checkout" });
                navigate(`/login?redirect_uri=${encodeURIComponent("/checkout")}`);
                return;
            }
            if (!items.length) {
                dispatch({ type: "SHOW", message: "Your cart is empty" });
                navigate("/cart");
                return;
            }
            const isValid = handleSubmit();
            if (!isValid) {
                return;
            }
            const created = await checkout(user.id); // lưu vào orders (json-server)
            dispatch({ type: "SHOW", message: "Checkout successful" });
            navigate("/", { replace: true });
        } catch (e) {
            dispatch({ type: "SHOW", message: e.message || "Checkout failed" });
        }
    };

    return (
        <Container className="py-4">
            <Row className="mb-3">
                <Col>
                    <h2 className="mb-0">
                        Checkout <Badge bg="secondary">{items.reduce((s, i) => s + (i.qty || 0), 0)}</Badge>
                    </h2>
                    <div className="text-muted small">Date: {new Date().toLocaleString()}</div>
                </Col>
                <Col className="text-end">
                    <Button as={Link} to="/cart" variant="outline-secondary">← Back to Cart</Button>
                </Col>
            </Row>

            {!user && (
                <Alert variant="warning" className="mb-3">
                    You need to sign in to continue. <Alert.Link as={Link} to="/login?redirect_uri=%2Fcheckout">Log in</Alert.Link>.
                </Alert>
            )}
            {items.length === 0 && (
                <Alert variant="info" className="mb-3">
                    Your cart is empty. <Alert.Link as={Link} to="/">Continue shopping</Alert.Link>.
                </Alert>
            )}

            <Row className="g-3">
                {/* Thông tin khách & địa chỉ */}
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Header className="fw-semibold">Customer</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <div className="small text-muted">Name</div>
                                <div className="fw-semibold">{user ? (user.name || user.email) : "Guest"}</div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="small text-muted">Email</div>
                                <div>{user ? user.email : "-"}</div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>

                    <Card className="shadow-sm mt-3">
                        <Card.Header className="fw-semibold">Shipping Address</Card.Header>
                        <Card.Body>
                            <Form >
                                <Form.Group controlId="formStreet">
                                    <Form.Label>Street Address</Form.Label>
                                    <Form.Control type="text" placeholder="Street Address" value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                        isInvalid={!!errors.street} />
                                    <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" placeholder="City" value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        isInvalid={!!errors.city} />
                                    <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formCountry">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="text" placeholder="Country" value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        isInvalid={!!errors.country} />
                                    <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>

                    <Card className="shadow-sm mt-3">
                        <Card.Header className="fw-semibold">Payment</Card.Header>
                        <Card.Body>
                            <div className="text-muted small">Method</div>
                            <div className="fw-semibold">Cash on Delivery</div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Hóa đơn (bill) */}
                <Col md={8}>
                    <Card className="shadow-sm">
                        <Card.Header className="fw-semibold d-flex justify-content-between align-items-center">
                            <span>Order Summary</span>
                            <Badge bg="dark">#{String(Date.now()).slice(-6)}</Badge>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <Table responsive hover className="mb-0 align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ width: 72 }}>#</th>
                                        <th>Item</th>
                                        <th className="text-end" style={{ width: 140 }}>Price</th>
                                        <th className="text-center" style={{ width: 120 }}>Qty</th>
                                        <th className="text-end" style={{ width: 160 }}>Line Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((it, idx) => {
                                        const line = (Number(it.price) || 0) * (Number(it.qty) || 0);
                                        return (
                                            <tr key={it.id}>
                                                <td className="text-muted">{idx + 1}</td>
                                                <td>
                                                    <div className="fw-semibold">{it.title}</div>
                                                    {it.name && <div className="text-muted small">{it.name}</div>}
                                                </td>
                                                <td className="text-end">{money(it.price)}</td>
                                                <td className="text-center">{it.qty}</td>
                                                <td className="text-end fw-semibold">{money(line)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot className="table-light">
                                    <tr>
                                        <td colSpan={4} className="text-end">Subtotal</td>
                                        <td className="text-end fw-semibold">{money(subtotal)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4} className="text-end">Tax (8%)</td>
                                        <td className="text-end fw-semibold">{money(tax)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4} className="text-end">Shipping</td>
                                        <td className="text-end fw-semibold">{money(shipping)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4} className="text-end fw-bold">Grand Total</td>
                                        <td className="text-end fw-bold fs-5">{money(grandTotal)}</td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Card.Body>
                    </Card>

                    <div className="text-end mt-3">
                        
                        <Button
                            variant="primary"
                            onClick={placeOrder}
                            disabled={!user || items.length === 0}
                        >
                            Place Order
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
