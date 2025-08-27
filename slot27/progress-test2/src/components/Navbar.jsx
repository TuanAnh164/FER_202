import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AppNavbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  return (
    <Navbar  expand="lg" sticky="top" className="shadow-sm">
      <Container>
        {/* Logo / Brand */}
        <Navbar.Brand 
          onClick={() => navigate('/products')}
          className="cursor-pointer fw-bold"
        >
           Mobile Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link className="d-flex align-items-center">
              <FaHeart size={18} className="me-1" /> Favourites
            </Nav.Link>

            <Nav.Link className="d-flex align-items-center">
              <FaShoppingCart size={18} className="me-1" /> Cart
            </Nav.Link>

            {!user ? ( <Nav.Link 
              className="d-flex align-items-center"
              onClick={() => navigate('/login')}
            >
              <FaUser size={18} className="me-1" /> Login
            </Nav.Link>) : (
              <Nav.Link 
                className="d-flex align-items-center"
                onClick={() => setUser(null)}
              >
                <FaUser size={18} className="me-1" /> Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
