import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaArrowLeft, FaCartPlus } from 'react-icons/fa';
import api from '../services/api';
import { formatPrice } from '../utils/format';

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
    return <Container className="py-4"><p>Loading product...</p></Container>;
  }

  return (
    <Container className="py-4">
      <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-1" /> Back
      </Button>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img src={`/${product.image}`} alt={product.name} />
          </Card>
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <Badge bg="primary" className="fs-5 mb-3">{formatPrice(product.price)}</Badge>
          <div>
            <Button variant="success">
              <FaCartPlus className="me-1" /> Add to Cart
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
