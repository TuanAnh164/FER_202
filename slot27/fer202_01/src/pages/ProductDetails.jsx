import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaArrowLeft, FaCartPlus, FaHeart } from "react-icons/fa";
import api from "../services/api";
import { formatPrice } from "../utils/format";

import AppNavbar from "../components/Navbar";
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        console.log("Product detail response:", data);
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  if (!product) {
    return (
      <Container className="py-4">
        <p>Loading product...</p>
      </Container>
    );
  }

  return (
    <>
      <AppNavbar />
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="border-0 shadow-sm">
              <Card.Img
                src={`/${product.image}`}
                alt={product.name}
                style={{ objectFit: "cover", borderRadius: "12px" }}
              />
            </Card>
          </Col>
          <Col md={7}>
            <Card className="border-0 shadow-sm p-4">
              <Card.Body>
                <Badge
                  bg="primary"
                  className="fs-4 mb-4 px-3 py-2"
                  style={{ borderRadius: "8px" }}
                >
                  {formatPrice(product.price)}
                </Badge>
                <h2 className="fw-bold mb-3">{product.name}</h2>
                <p
                  className="text-secondary mb-4"
                  style={{ fontSize: "1.1rem" }}
                >
                  {product.description}
                </p>

                <div className="d-flex gap-3 justify-content-center">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="flex-fill"
                    onClick={() => {}}
                  >
                    <>
                      <FaHeart className="me-1" />
                      Add to Favourites
                    </>
                  </Button>

                  <Button
                    variant="success"
                    size="lg"
                    onClick={() => {}}
                    className="px-4 py-2 shadow-sm"
                  >
                    <FaCartPlus className="me-2" /> Add to cart
                  </Button>
                </div>
                <Button
                  variant="outline-dark "
                  style={{width: "100%"}}
                  size="lg"
                  className="mt-4  "
                  onClick={() => navigate(-1)}
                >
                  <FaArrowLeft className="me-2" /> Back
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
