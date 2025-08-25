import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";
import { Card, Form, Button, Alert } from "react-bootstrap";
import {Link} from "react-router-dom";
export default function UpdateProductPage() {
    const { id } = useParams();
    const { products, updateProduct } = useProducts();
    const navigate = useNavigate();

    const product = products.find((p) => String(p.id) === id);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setPrice(product.price);
            setImage(product.image || "");
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await updateProduct(product.id, { title, price: Number(price), image });
            navigate("/"); // quay về trang danh sách sản phẩm
        } catch (err) {
            setError("Failed to update product");
        }
    };

    if (!product) return <p>Product not found</p>;

    return (
        <Card className="p-4" style={{ maxWidth: 500, margin: "20px auto" }}>
            <Card.Title>Update Product</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </Form.Group>
                <div className="d-flex justify-content-between">
                <Button variant="dark" as={Link} to="/">
                    Back to Home
                </Button>
                <Button type="submit" variant="dark">Update Product</Button>
                </div>
            </Form>
        </Card>
    );
}
