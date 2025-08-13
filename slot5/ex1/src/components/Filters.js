import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

function Filters({
  maxPrep,
  setMaxPrep,
  maxCook,
  setMaxCook,
  search,
  setSearch,
  sortOption,
  setSortOption
}) {

  return (
    <Row className="mb-4">
      <Col md={3}>
        <Form.Select
          value={maxPrep}
          onChange={(e) => setMaxPrep(e.target.value)}
        >
          <option value="">Max Prep Time</option>
          <option value="5">5 mins</option>
          <option value="10">10 mins</option>
          <option value="15">15 mins</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select
          value={maxCook}
          onChange={(e) => setMaxCook(e.target.value)}
        >
          <option value="">Max Cook Time</option>
          <option value="5">5 mins</option>
          <option value="10">10 mins</option>
          <option value="15">15 mins</option>
          <option value="20">20 mins</option>
        </Form.Select>
      </Col>
      <Col md={4}>
        <Form.Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="title-asc">Name A → Z</option>
          <option value="title-desc">Name Z → A</option>
          <option value="prep-asc">Prep Time ↑</option>
          <option value="prep-desc">Prep Time ↓</option>
          <option value="cook-asc">Cook Time ↑</option>
          <option value="cook-desc">Cook Time ↓</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Control
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Col>
    </Row>
  );
}

export default Filters;
