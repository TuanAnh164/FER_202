import { useState, useContext } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login({ darkMode }) {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email);
    navigate("/"); 
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <Card className={darkMode ? "bg-dark text-light p-4" : "p-4 shadow-sm"}>
        <Card.Title className="mb-3">Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant={darkMode ? "outline-light" : "primary"} type="submit">
            Đăng nhập
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
