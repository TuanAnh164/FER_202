import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">
          Movie Explorer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">	Free Movies </Nav.Link>
            <Nav.Link href="/favourites">	My Favourite Movies </Nav.Link>
            <Nav.Link href="/request">	Movie Request Form </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
