import { Button } from "react-bootstrap";
import Carousels from "../components/Carousel";
import AppNavbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigator =useNavigate();    
  return (
    <>
      <AppNavbar />
      <Carousels />
      <div className="text-center">
        <h1>Welcome to Our Shop</h1>
        <h3>The best place to buy mobile shop online with great offers and quality products</h3>
      </div>
      <div className="d-flex justify-content-center">
        <Button onClick={() => navigator("/products")}>Browse mobile shop</Button>
      </div>
    </>
  );
}
