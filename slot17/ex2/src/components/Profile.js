import { useContext } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export default function Profile({ darkMode }) {
    const { user, logout } = useContext(AuthContext);

    if (!user) {
        return (
            <Container className="mt-5">
                <h4>Bạn chưa đăng nhập!</h4>
            </Container>
        );
    }

    return (
        <Container className="mt-5" style={{ maxWidth: "500px" }}>
            <Card className={darkMode ? "bg-dark text-light p-4" : "p-4 shadow-sm"}>
                <Card.Title>Thông tin tài khoản</Card.Title>
                <p><strong>Tên:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <Button
                    variant={darkMode ? "outline-light" : "primary"}
                    onClick={() => window.location.href = "/"}
                >
                    Quay lại trang chủ
                </Button>
            <Button
                variant={darkMode ? "outline-light" : "danger"}
                onClick={() => {
                    logout();
                    window.location.href = "/";
                }}
            >
            Đăng xuất
        </Button>
        </Card>
    </Container >
  );
}
