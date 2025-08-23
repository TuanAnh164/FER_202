import { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import App from "../App";
import AppNavbar from "./Navbar";

export default function Register({ darkMode }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = "/";
        setFormData({ name: "", email: "", password: "" }); // reset form
    };

    return (
        <>
        <AppNavbar darkMode={darkMode} />
            <Container className="mt-5" style={{ maxWidth: "500px" }}>
                <Card className={darkMode ? "bg-dark text-light p-4" : "p-4 shadow-sm"}>
                    <Card.Title className="mb-3">Register Account</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Họ và Tên</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
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

                        <Form.Group className="mb-3" controlId="formPassword">
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
                            Đăng ký
                        </Button>
                    </Form>
                </Card>
            </Container></>
    );
}
