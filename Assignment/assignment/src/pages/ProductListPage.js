import { useProducts } from "../contexts/ProductContext";
import { Row, Col, Button, } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import {useAuth} from "../contexts/AuthContext";

export default function ProductListPage({ products }) {
    const { loading, error } = useProducts();
    const { user } = useAuth();

    if (loading) return <div>Loading products...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <>
           {user && user.role === "admin" && (
               <div className="d-flex justify-content-end px-5">
                   <Button href="/add-product" variant="dark" className="m-3">Add New Product</Button>
               </div>
           )}
            <Row className="py-4 px-5" style={{ marginLeft: 0, marginRight: 0 }}>
                {products.length > 0 ? (
                    products.map((p) => (
                        <Col md={4} className="mb-4" key={p.id}>
                            <ProductCard product={p} />
                        </Col>
                    ))) : (
                    <p className="text-center">No products found</p>
                )}
            </Row>
        </>
    );
}
