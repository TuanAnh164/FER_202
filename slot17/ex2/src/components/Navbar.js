import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SearchItem from "./SearchItem";

export default function AppNavbar({ onQuickSearch }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Dish Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/register">Register account</Nav.Link>
            <Nav.Link href="/request">Request Dish</Nav.Link>
          </Nav>
          <SearchItem onQuickSearch={onQuickSearch} />
          <Nav>
            <NavDropdown title="👤" id="user-dropdown" align="end">
              {user ? (
                <>
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/favourites">My Favourites</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
