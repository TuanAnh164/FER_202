import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Card, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function LoginPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login, setRedirectAfterLogin, redirectAfterLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  // Lưu redirect_uri vào context để quay lại sau khi login
  useEffect(() => {
    const r = params.get("redirect_uri");
    if (r) setRedirectAfterLogin(r);
  }, [params, setRedirectAfterLogin]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email.trim(), password);
      navigate(redirectAfterLogin || "/", { replace: true });
    } catch (error) {
      setErr(error.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: 16, maxWidth: 420, margin: "0 auto" }}>
      <Card className="p-4">
        <Card.Title style={{ marginBottom: 12 }}>Customer Login</Card.Title >
        {err && (
          <div style={{ padding: 8, background: "#ffe7e7", border: "1px solid #ffb3b3", marginBottom: 12 }}>
            {err}
          </div>
        )}
        <Form onSubmit={onSubmit}>
          <Form.Group style={{ display: "grid", gap: 8 }}>
            <Form.Label>
              Email
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                type="email"
                required
                style={{ marginTop: 4 }}
              />
            </Form.Label>
            <Form.Label>
              Password
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                type="password"
                required
              />
            </Form.Label>
          </Form.Group>
          <div className="text-center">
            <Button className="px-5" variant="dark" type="submit" style={{ padding: 10, marginTop: 8 }} >Sign in</Button>
          </div>
          <div className="text-center " style={{ marginTop: 12 }}>
            New Customer?{" "}
            <Button variant="dark" style={{ padding: 6 }} onClick={() => navigate("/register")} >
              Register
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
