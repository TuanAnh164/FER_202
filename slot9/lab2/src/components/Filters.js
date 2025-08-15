// Filters.js
import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Form } from "react-bootstrap";

function Filters({
  maxDuration,
  setMaxDuration,
  maxYear,
  setMaxYear,
  search,
  setSearch,
  sortOption,
  setSortOption,
  genre,
  setGenre
}) {
  return (
    <Row className="mb-4">
      <Col md={3}>
        <Form.Select
          value={maxDuration}
          onChange={(e) => setMaxDuration(e.target.value)}
        >
          <option value="">Max Duration Time</option>
          <option value="100">100 mins</option>
          <option value="90">90 mins</option>
          <option value="120">120 mins</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select
          value={maxYear}
          onChange={(e) => setMaxYear(e.target.value)}
        >
          <option value="">Year</option>
          <option value="2021">2021</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">All</option>
          <option value="Action">Action</option>
          <option value="Animation">Animation</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="title-asc">Name A → Z</option>
          <option value="title-desc">Name Z → A</option>
          <option value="duration-asc">Duration ↑</option>
          <option value="duration-desc">Duration ↓</option>
          <option value="year-asc">Year ↑</option>
          <option value="year-desc">Year ↓</option>
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

Filters.propTypes = {
  maxDuration: PropTypes.string.isRequired,
  setMaxDuration: PropTypes.func.isRequired,
  maxYear: PropTypes.string.isRequired,
  setMaxYear: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
  setSortOption: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
  setGenre: PropTypes.func.isRequired,
};

export default Filters;
