import { Dropdown } from "react-bootstrap";

export default function SortDropdown({ sortOption, setSortOption }) {
  return (
    <Dropdown className="mb-3">
      <Dropdown.Toggle variant="secondary">Sort</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setSortOption("ageAsc")}>Age ↑</Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOption("ageDesc")}>Age ↓</Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOption("nameAsc")}>Name A→Z</Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOption("nameDesc")}>Name Z→A</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
