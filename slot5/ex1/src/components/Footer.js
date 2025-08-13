import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-light py-3 border-top mt-4">
      <Container className="d-flex justify-content-between align-items-center">
        <span>Made with ❤️ and 🍓</span>
        <div>
          <a href="#facebook" className="me-2">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#twitter" className="me-2">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#instagram">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
