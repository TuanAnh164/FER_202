import React from "react";
import { Row, Col, Form } from "react-bootstrap";

function Filters({ maxPrep, setMaxPrep, maxCook, setMaxCook, search, setSearch }) {
  return (
    <Row className="mb-4">
      <Col md={3}>
        <Form.Select value={maxPrep} onChange={e => setMaxPrep(e.target.value)}>
          <option value="">Max Prep Time</option>
          <option value="5">5 mins</option>
          <option value="10">10 mins</option>
          <option value="15">15 mins</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select value={maxCook} onChange={e => setMaxCook(e.target.value)}>
          <option value="">Max Cook Time</option>
          <option value="5">5 mins</option>
          <option value="10">10 mins</option>
          <option value="15">15 mins</option>
          <option value="20">20 mins</option>
        </Form.Select>
      </Col>
      <Col md={6}>
        <Form.Control
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Col>
    </Row>
  );
}

export default Filters;
