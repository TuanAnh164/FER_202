import ProductListPage from "./ProductListPage";
import { ToastContext, ToastProvider } from "../contexts/ToastContext";
import { useContext, useState } from "react";
import Carousels from "../components/Carousel";
import { NavBar } from "../components/NavBar";
export default function HomePage() {
    const { state, dispatch } = useContext(ToastContext);
    const [products, setProducts] = useState([]);
  return (
    <div >
      <Carousels />
      <NavBar setProducts={setProducts} />
      <ProductListPage products={products} />
    </div>
  );
}
