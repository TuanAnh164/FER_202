import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export default function StudentCard({ student, onView }) {
  return (
    <Card className="h-100">
      {student.avatar ? (
        <Card.Img style={{ height: "500px" }} variant="top" src={student.avatar} alt={student.name} />
      ) : (
        <Card.Img style={{ height: "500px" }} variant="top" src="/img/i0.png" alt={student.name} />
      )}
      <Card.Body>
        <Card.Title>{student.name}</Card.Title>
        <Card.Text>
          <b>ID:</b> {student.id} <br />
          <b>Email:</b> {student.email} <br />
          <b>Age:</b> {student.age}
        </Card.Text>
        <Button variant="primary" onClick={() => onView(student)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  onView: PropTypes.func.isRequired
};
