import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function MediaRequestForm() {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    duration: "",
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

    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.genre.trim()) newErrors.genre = "Genre is required.";
    if (!formData.year || isNaN(formData.year) || Number(formData.year) <= 1900)
      newErrors.year = "Year must be greater than 1900.";
    if (!formData.duration || isNaN(formData.duration) || Number(formData.duration) <= 0)
      newErrors.duration = "Duration must be greater than 0.";
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
        title: "",
        genre: "",
        year: "",
        duration: "",
        description: ""
      });
    }
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-primary">Media Request Form</h2>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
           Request submitted. Thank you!
        </Alert>
      )}

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            isInvalid={!!errors.genre}
          />
          <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formYear">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            isInvalid={!!errors.year}
          />
          <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDuration">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            isInvalid={!!errors.duration}
          />
          <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
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
  );
}

export default MediaRequestForm;
