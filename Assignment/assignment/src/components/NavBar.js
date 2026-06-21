import { useProducts } from "../contexts/ProductContext";
import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
export function NavBar({ setProducts }) {
    const { products } = useProducts();
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("default");
    const [category, setCategory] = useState("all");
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
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        if (e.target.value === "all") {
            setProducts(products);
        }
        if (e.target.value === "hot") {
            const filtered = products.filter((p) =>
                p.tags.includes("hot")
            );
            setProducts(filtered);
            return;
        } if (e.target.value === "sale") {
            const filtered = products.filter((p) =>
                p.tags.includes("sale")
            );
            setProducts(filtered);
        } else {
            const filtered = products.filter((p) =>
                p.name === e.target.value
            );
            setProducts(filtered);
        }
    };
    return (
        <>
            <div >
                <Row className="align-items-center justify-content-end" style={{ marginRight: "2.5rem" }}>
                    <Col md={4}>
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
                    <Col md={2} className="text-end">
                        <Form.Select
                            onChange={handleCategoryChange}
                            value={category}
                        >
                            <option value="all">All Categories</option>
                            <option value="Giant">Giant</option>
                            <option value="Trek">Trek</option>
                            <option value="Specialized">Specialized</option>
                            <option value="Cannondale">Cannondale</option>
                            <option value="Bianchi">Bianchi</option>
                            <option value="hot">Hot</option>
                            <option value="sale">Sale</option>
                        </Form.Select>
                    </Col>
                </Row>
            </div>
        </>
    );
}
