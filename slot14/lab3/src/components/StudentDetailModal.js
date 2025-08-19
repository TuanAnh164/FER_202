import { Modal, Button } from "react-bootstrap";

export default function StudentDetailModal({ student, onClose }) {
  if (!student) return null;
  return (
    <Modal show={!!student} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{student.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {student.avatar && <img src={student.avatar} alt={student.name} className="img-fluid mb-3" />}
        <p><b>ID:</b> {student.id}</p>
        <p><b>Email:</b> {student.email}</p>
        <p><b>Age:</b> {student.age}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
