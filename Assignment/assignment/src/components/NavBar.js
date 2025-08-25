import { useProducts } from "../contexts/ProductContext";
import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
export function NavBar({ setProducts }) {
    const { products } = useProducts();
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("default");
    console.log(products);
    useEffect(() => {
        setProducts(products);
    }, [products, setProducts]);
    const handleSearch = (query) => {
        if (!query.trim()) {
            setProducts(products);
            return;
        }
        const filtered = products.filter((p) =>
            p.title.toLowerCase().includes(query.toLowerCase())
        );

        setProducts(filtered);
    };
    const handleSort = (e) => {
        if (e === "default") {
            setProducts(products);
            return;
        } if (e === "name-asc") {
            const sorted = [...products].sort((a, b) => a.title.localeCompare(b.title));
            setProducts(sorted);
            return;
        } if (e === "name-desc") {
            const sorted = [...products].sort((a, b) => b.title.localeCompare(a.title));
            setProducts(sorted);
            return;
        } if (e === "price-asc") {
            const sorted = [...products].sort((a, b) => a.price - b.price);
            setProducts(sorted);
            return;
        } if (e === "price-desc") {
            const sorted = [...products].sort((a, b) => b.price - a.price);
            setProducts(sorted);
        }
    }
    return (
        <>
            <div >
                <Row className="align-items-center justify-content-end" style={{ marginRight: "2.5rem" }}>
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Search products..."
                            onChange={(e) => {
                                setSearch(e.target.value);
                                handleSearch(e.target.value);
                            }}
                        />
                    </Col>
                    <Col md={2} className="text-end">
                        <Form.Select
                            onChange={(e) => {
                                setSortOrder(e.target.value);
                                handleSort(e.target.value);
                            }}
                        >
                            <option value="default">Sort by</option>
                            <option value="name-asc">Name: A to Z</option>
                            <option value="name-desc">Name: Z to A</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </Form.Select>
                    </Col>
                </Row>
            </div>
        </>
    );
}
