import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          Healthy Recipe Finder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">About</Nav.Link>
            <Nav.Link href="/">Recipes</Nav.Link>
            <Nav.Link href="/request">Recipe Request Form</Nav.Link>
          </Nav>
          <Button variant="primary">Browse recipes</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
