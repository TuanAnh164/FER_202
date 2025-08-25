import { Link } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Container, Row, Col, ListGroup, Badge, Button } from "react-bootstrap";

export default function ManageUser() {
    const { accounts, setAccounts, updateAccountHandler } = useAuth();
    const { user } = useAuth();
    if (user?.role !== "admin") return <div as={Link} to="/" ></div>;
    const handleUpdate = async (acc) => {
        const newRole = acc.role === "admin" ? "user" : "admin";
        try {
            await updateAccountHandler({ id: acc.id, role: newRole });
        } catch (error) {
            console.error("Failed to update user:", error);
        }
    };

    return (
        <Container className="mt-5" >
            <Row>
                <Col>
                    <h1 className="text-center mb-4 text-light">Manage Users</h1>
                    <ListGroup>
                        {accounts.map((acc) => (
                            <ListGroup.Item key={acc.id} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{acc.name}</strong>{" "}
                                    <span className="text-muted">({acc.email})</span>
                                    <div>
                                        <Badge
                                            bg={acc.role === "admin" ? "success" : "secondary"}
                                            className="ms-2"
                                            style={{ fontSize: 12 }}
                                        >
                                            {acc.role}
                                        </Badge>
                                    </div>
                                </div>
                                <Button
                                    variant="dark"
                                    size="sm"
                                    className="fw-bold"
                                    onClick={() => handleUpdate(acc)}
                                >
                                    Set as {acc.role === "admin" ? "User" : "Admin"}
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}
