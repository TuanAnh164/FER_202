import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Form, Button, Card } from "react-bootstrap";

const SECRET_QUESTIONS = [
  "What is your favorite color?",
  "What is your pet's name?",
  "What city were you born in?"
];

export default function RegisterPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { register, setRedirectAfterLogin, redirectAfterLogin } = useAuth();

  const [step, setStep] = useState(1);

  // About
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // avatar chỉ là URL hoặc để trống; nếu muốn preview file thật thì thêm input type="file" + URL.createObjectURL
  const [avatar, setAvatar] = useState("");

  // Account
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [secretQuestion, setSecretQuestion] = useState(SECRET_QUESTIONS[0]);
  const [answer, setAnswer] = useState("");
  const [preview, setPreview] = useState("");
  const [err, setErr] = useState("");
  const canNext = useMemo(() => name.trim() && email.includes("@"), [name, email]);

  useEffect(() => {
    const r = params.get("redirect_uri");
    if (r) setRedirectAfterLogin(r);
  }, [params, setRedirectAfterLogin]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        avatar: avatar ? URL.createObjectURL(avatar) : "",
        username: username.trim(),
        password,
        confirm,
        secretQuestion,
        answer: answer.trim(),
      });
      navigate(redirectAfterLogin || "/", { replace: true });
    } catch (error) {
      setErr(error.message || "Registration failed");
    }
  };

  return (
    <div style={{ padding: 16, maxWidth: 520, margin: "0 auto" }}>
      <Card className="p-4">
        <h2 style={{ marginBottom: 6 }}>Create an account</h2>
        <div style={{ marginBottom: 12 }}>Step {step} / 2</div>

        {err && (
          <div style={{ padding: 8, background: "#ffe7e7", border: "1px solid #ffb3b3", borderRadius: 10, marginBottom: 12 }}>
            {err}
          </div>
        )}

        <Form onSubmit={onSubmit}>
          {step === 1 && (
            <div style={{ display: "grid", gap: 10 }}>
              <Form.Group controlId="formName">
                <Form.Label>Full name *</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyen Van A"
                  required
                  style={{ marginTop: 4 }}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formAvatar">
                <Form.Label>
                  Avatar (URL jpg/png, ≤ 2MB )
                </Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setAvatar(file);
                      setPreview("/uploads/avatar1.png");
                    }
                  }}
                  placeholder="/uploads/avatar1.png"
                  style={{ width: "100%", padding: 8, marginTop: 4 }}
                />
              </Form.Group>
              <Form.Group controlId="formPreview" className="text-center">
                {preview && <img src={preview} alt="Avatar Preview" style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginTop: 8,
                }} />}
              </Form.Group>

              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <Button type="button" onClick={() => setStep(2)} disabled={!canNext} style={{ padding: 10 }} variant="dark">
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "grid", gap: 10 }}>
              <Form.Group controlId="formPreview" className="">
                <Form.Label>Username *</Form.Label>
                <Form.Control
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{ width: "100%", padding: 8, marginTop: 4 }}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>
                  Password * (≥ 6)
                </Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  style={{ width: "100%", padding: 8, marginTop: 4 }}
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>
                  Confirm password *
                </Form.Label>
                <Form.Control
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  type="password"
                  required
                  style={{ width: "100%", padding: 8, marginTop: 4 }}
                />
              </Form.Group>

              <Form.Group controlId="formSecretQuestion">
                <Form.Label>
                  Secret question
                </Form.Label>
                <Form.Control
                  as="select"
                  value={secretQuestion}
                  onChange={(e) => setSecretQuestion(e.target.value)}
                  style={{ width: "100%", padding: 8, marginTop: 4 }}
                >
                  {SECRET_QUESTIONS.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formAnswer">
                <Form.Label>
                  Answer *
                </Form.Label>
                <Form.Control
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                  style={{ width: "100%", padding: 8, marginTop: 4 }}
                />
              </Form.Group>

              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <Button variant="dark" type="button" onClick={() => setStep(1)} style={{ padding: 10 }}>
                  Previous
                </Button>
                <Button variant="dark" type="submit" style={{ padding: 10 }}>Submit</Button>
              </div>
            </div>
          )}
        </Form>
      </Card>
    </div>
  );
}

