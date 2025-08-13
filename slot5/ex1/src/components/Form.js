import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function RecipeRequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ingredient: "",
    prepTime: "",
    notes: ""
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      alert("📨 Request submitted!\n" + JSON.stringify(formData, null, 2));
      setFormData({
        name: "",
        email: "",
        ingredient: "",
        prepTime: "",
        notes: ""
      });
    }

    setValidated(true);
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-primary">Recipe Request Form</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter your name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formIngredient">
          <Form.Label>Desired Ingredient</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Fresh salmon fillet"
            name="ingredient"
            value={formData.ingredient}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter desired ingredient.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrepTime">
          <Form.Label>Max Prep Time</Form.Label>
          <Form.Select
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a max prep time.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Add any extra details..."
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter some notes.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="d-flex align-items-center">
          <FaPaperPlane className="me-2" /> Submit Request
        </Button>
      </Form>
    </Container>
  );
}

export default RecipeRequestForm;
