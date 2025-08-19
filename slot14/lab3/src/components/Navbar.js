import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";

export default function AppNavbar({ onQuickSearch }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">Student Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Students</Nav.Link>
            <Nav.Link href="/">About</Nav.Link>
            <Nav.Link href="/profile">Build your Profile</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Quick search"
              onChange={(e) => onQuickSearch(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
