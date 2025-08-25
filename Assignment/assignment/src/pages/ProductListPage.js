import { useProducts } from "../contexts/ProductContext";
import { Row, Col, Button, } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
export default function ProductListPage({ products }) {
    const { loading, error } = useProducts();

    if (loading) return <div>Loading products...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <>
            <div className="d-flex justify-content-end px-5">
                <Button href="/add-product" variant="dark" className="m-3">Add New Product</Button>
            </div>
            <Row className="py-4 px-5">
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
