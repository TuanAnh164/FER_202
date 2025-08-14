import NameList from "./components/NameList";
import UserProfile from "./components/UserProfile";
import Welcome from "./components/Welcome";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import StudentCard from "./components/StudentCard";

function App() {
  const userData = { name: "anhttde180904@fpt.edu.vn", age: 21 };
  const namesList = ["anhttde180904@fpt.edu.vn", "test@fpt.edu.vn"];
  const students = [
    { name: "anhttde180904@fpt.edu.vn", age: 20, avatar: "logo192.png" },
    { name: "anhttde180904@fpt.edu.vn", age: 21, avatar: "logo192.png" },
    { name: "anhttde180904@fpt.edu.vn", age: 22, avatar: "logo192.png" },
  ];
  return (
    <>
      <Welcome name="anhttde180904@fpt.edu.vn" />
      <UserProfile user={userData} />
      <NameList names={namesList} />
      <Container>
        <h1 className="my-4 text-center">Student information</h1>
        <Row>
          {students.map((student, index) => (
            <Col key={index} sm={12} md={4}>
              <StudentCard student={student} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
