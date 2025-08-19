import { Form, Row, Col } from "react-bootstrap";

export default function Filters({ filters, setFilters }) {
  return (
    <Form className="my-3">
      <Row className="g-2">
        <Col md={4}>
          <Form.Control
            placeholder="Search by name/email"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={filters.ageRange}
            onChange={(e) => setFilters({ ...filters, ageRange: e.target.value })}
          >
            <option value="">All ages</option>
            <option value="≤20">≤20</option>
            <option value="21-25">21–25</option>
            <option value=">25">25+</option>
          </Form.Select>
        </Col>
        <Col md={4} className="d-flex align-items-center">
          <Form.Check
            type="checkbox"
            label="Has avatar"
            checked={filters.hasAvatar}
            onChange={(e) => setFilters({ ...filters, hasAvatar: e.target.checked })}
          />
        </Col>
      </Row>
    </Form>
  );
}
