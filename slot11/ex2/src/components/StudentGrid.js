import { Row, Col } from "react-bootstrap";
import StudentCard from "./StudentCard";

export default function StudentGrid({ students, onView }) {
  return (
    <Row xs={1} sm={2} md={3} className="g-4">
      {students.map((s) => (
        <Col key={s.id}>
          <StudentCard student={s} onView={onView} />
        </Col>
      ))}
    </Row>
  );
}
