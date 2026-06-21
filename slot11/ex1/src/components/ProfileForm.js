import { Form, Button, Toast, Modal, Card, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProfileForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  // const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

//   const validateForm = () => {
//     let newErrors = {};
//     if (!name.trim()) newErrors.name = "Name is required";
//     if (!age.trim() || Number(age) < 1) newErrors.age = "Age must be ≥ 1";
//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!email.includes("@")) {
//       newErrors.email = "Email must contain @";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

  const isFormValid = () =>
    name.trim() && email.includes("@") && Number(age) >= 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit({ name, age, email });
      setShowToast(true);
      setShowModal(true);
      setTimeout(() => setShowToast(false), 2000);
     
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "500px" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            // isInvalid={!!errors.name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {/* {errors.name} */}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formAge" className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            value={age}
            // isInvalid={!!errors.age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {/* {errors.age} */}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            // isInvalid={!!errors.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {/* {errors.email} */}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!isFormValid()}>
          Submit
        </Button>
      </Form>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} bg="success">
          <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
        </Toast>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Card>
          <Card.Body>
            <h3>Submitted Data</h3>
            <p><b>Name:</b> {name}</p>
            <p><b>Email:</b> {email}</p>
            <p><b>Age:</b> {age}</p>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Card.Body>
        </Card>
      </Modal>
    </Container>
  );
}

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
