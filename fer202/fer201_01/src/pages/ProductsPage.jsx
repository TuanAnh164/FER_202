import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Card,
} from "react-bootstrap";
import { FaSearch, FaTimesCircle, FaFilter, FaSort } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import { useProductFilters } from "../hooks/useProductFilters";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/Motorbikes");
      const normalized = (data || []).map((p) => ({
        id: p.id,
        brand: p.brand,
        model: p.model,
        year: p.year,
        price: p.price,
        image: p.image || `https://picsum.photos/seed/${p.id}/600/400`,
        description: p.description,
        stock: p.stock,
      }));
      setProducts(normalized);
    })();
  }, []);

  const filteredProducts = useProductFilters(
    products,
    searchQuery,
    sortBy,
  );

  return (
    <>
      {/* <AppNavbar /> */}
      <Container className="py-4">
        <h1 className="mb-4">Products</h1>

        <Card className="mb-4">
          <Card.Body>
            <Row className="g-3">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <Button
                      variant="outline-secondary"
                      onClick={() => setSearchQuery("")}
                    >
                      <FaTimesCircle />
                    </Button>
                  )}
                </InputGroup>
              </Col>
            
              <Col md={3}>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSort />
                  </InputGroup.Text>
                  <Form.Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="default">Sort By</option>
                    <option value="price-asc">Price ↑</option>
                    <option value="price-desc">Price ↓</option>
                  </Form.Select>
                </InputGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Button onClick={() => navigate("/cart")} >
          Cart
        </Button>
        <Row className="g-4">
          {filteredProducts.map((p) => (
            <Col key={p.id} xs={12} sm={6} md={4}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
        {filteredProducts.length === 0 && (
          <Row className="mt-4">
            <Col>
              <Card className="text-center">
                <Card.Body>No motorbike found.(Server error)</Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
