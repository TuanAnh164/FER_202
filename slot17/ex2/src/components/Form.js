import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { dishes } from "../data/dish"; 
import AppNavbar from "./Navbar";

function DishRequestForm() {
    const nextId = dishes && dishes.length > 0
    ? Math.max(...dishes.map(d => Number(d.id))) + 1
    : 1;
  const [formData, setFormData] = useState({
    id: nextId.toString(),
    name: "",
    image: "",
    price: "",
    description: ""
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear lỗi khi nhập lại
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.image.trim()) newErrors.image = "Image URL is required.";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      newErrors.price = "Price must be greater than 0.";
    if (!formData.description.trim() || formData.description.trim().length < 30)
      newErrors.description = "Description must be at least 30 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowAlert(true);
      setFormData({
        id: (nextId + 1).toString(),
        name: "",
        image: "",
        price: "",
        description: ""
      });
    }
  };

  return (
    <>
      <AppNavbar />
      <Container className="my-4">
        <h2 className="mb-4 text-primary">Dish Request Form</h2>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
           Request submitted. Thank you!
        </Alert>
      )}

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            isInvalid={!!errors.image}
          />
          <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            isInvalid={!!errors.price}
          />
          <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="d-flex align-items-center">
          <FaPaperPlane className="me-2" /> Submit Request
        </Button>
      </Form>
    </Container>
  </>
  );
}

export default DishRequestForm;
