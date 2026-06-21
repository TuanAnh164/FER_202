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
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage({}) {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setValidated(true);

    try {
      const { data: accounts } = await api.get("/UserAccounts");
      const account = accounts.find(
        (acc) => acc.username === email && acc.password === password
      );

      if (!account) {
        setError("Username or password is incorrect!");
        return;
      }

      if (!account.status) {
        setError("Account is locked.");
        return;
      }

      setUser(account);
      setSuccess("Login successful!");
      setTimeout(() => navigate("/Motorbikes"), 1000);
    } catch (err) {
      setError("Server error!");
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
              <Form noValidate validated={validated} onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter username"
                    required
                    isInvalid={validated && !email}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid username.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    isInvalid={validated && !password}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your password.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="justify-content-between d-flex gap-3">
                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-100"
                    onClick={() => {
                      setEmail("");
                      setPassword("");
                      setError("");
                      setSuccess("");
                      setValidated(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

// LoginPage.propTypes = {
//   setUser: PropTypes.func.isRequired,
//   email: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
//   onEmailChange: PropTypes.func.isRequired,
//   onPasswordChange: PropTypes.func.isRequired,
// };
