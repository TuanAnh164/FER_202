import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaArrowLeft, FaCartPlus, FaHeart } from "react-icons/fa";
import api from "../services/api";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);


  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/Motorbikes/${id}`);
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
      {/* <AppNavbar /> */}
      <Container className="py-4">
        <Button
          variant="outline-dark"
          className="mb-4 shadow-sm"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" /> Back
        </Button>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="border-0 shadow-sm">
              <Card.Img
                src={`${product.image}`}
                alt={product.model}
                style={{ objectFit: "cover", borderRadius: "12px" }}
              />
            </Card>
          </Col>
          <Col md={7}>
            <Card className="border-0 shadow-sm p-4">
              <Card.Body>
                <h2 className="fw-bold mb-3">{product.model}</h2>
                <p
                  className="text-secondary mb-4"
                  style={{ fontSize: "1.1rem" }}
                >
                  {product.description}
                </p>
                <div className="text-end">
                  <Badge
                    bg="primary"
                    className="fs-4 mb-4 px-3 py-2"
                    style={{ borderRadius: "8px" }}
                  >
                    {product.price}
                  </Badge>
                  <div className="d-flex gap-3 justify-content-end">
                   
                    <Button
                      variant="success"
                      size="lg"
                      
                      className="px-4 py-2 shadow-sm"
                    >
                      <FaCartPlus className="me-2" /> Add to cart
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
