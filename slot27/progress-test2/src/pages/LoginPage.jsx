import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage({setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { data: accounts } = await api.get("/accounts");
      const account = accounts.find(
        (acc) => acc.email === email && acc.password === password
      );

      if (!account) {
        setError("❌ Email hoặc mật khẩu không đúng!");
        return;
      }

      if (!account.isActive) {
        setError("⚠️ Tài khoản đã bị khóa. Vui lòng liên hệ admin.");
        return;
      }

      setUser(account);
      setSuccess("✅ Đăng nhập thành công!");
      setTimeout(() => navigate("/products"), 1000);
    } catch (err) {
      setError("Lỗi server!");
      console.error(err);
    }

  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body>
              <h3 className="mb-4 text-center">Login</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
