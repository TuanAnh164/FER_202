import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, LogIn } from "lucide-react";

const AppNavbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar bg="secondary" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        {/* Logo / Brand */}
        <Navbar.Brand
          onClick={() => navigate("/home")}
          className="cursor-pointer fw-bold text-white"
        >
          Home
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav " className="bg-light" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link
             
              className="d-flex align-items-center text-white"
            >
              <FaHeart size={18} className="me-1" /> Favourites
            </Nav.Link>

            <Nav.Link
           
              className="d-flex align-items-center text-white"
            >
              <FaShoppingCart size={18} className="me-1" /> Cart
            </Nav.Link>

            {!user ? (
              <>
                <Nav.Link
                  className="d-flex align-items-center text-white"
                  onClick={() => navigate("/login")}
                >
                  <LogIn size={18} className="me-1" />
                </Nav.Link>
                <FaUser size={18} className=" text-white me-1" style={{marginTop: 10}} />
              </>
            ) : (
              <Nav.Link
                className="d-flex align-items-center text-white"
                onClick={() => setUser(null)}
              >
                <LogOut size={18} className="me-1" />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
