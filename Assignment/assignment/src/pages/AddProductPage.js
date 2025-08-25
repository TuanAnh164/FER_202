import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function AddProductPage() {
    const { addProduct } = useProducts();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [tags, setTags] = useState(""); // comma-separated
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const payload = {
                title,
                name,
                description,
                price: Number(price),
                image,
                tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0),
            };
            await addProduct(payload);
            navigate("/"); // quay về trang danh sách sản phẩm
        } catch (err) {
            setError("Failed to add product");
        }
    };

    return (<>
        <div className="d-flex justify-content-end " style={{ paddingTop: "20px", paddingRight: "20px" }}>
            <Button variant="dark" as={Link} to="/">
                Back to Home
            </Button>
        </div>
        <Card className="p-4" style={{ maxWidth: 600, margin: "20px auto" }}>
            <Card.Title>Add New Product</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} className="d-flex justify-content-between" style={{ gap: "15px" }}>
                <div>
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
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div>
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

                    <Form.Group className="mb-3">
                        <Form.Label>Tags (comma-separated)</Form.Label>
                        <Form.Control
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g. hot,new,sale"
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button type="submit" variant="dark">Add Product</Button>
                    </div>
                </div>
            </Form>
        </Card>
    </>
    );
}
