import { Carousel } from 'react-bootstrap';
import { useProducts } from '../contexts/ProductContext';
import { motion } from "framer-motion";

export default function Carousels() {
  const { products, loading, error } = useProducts();
  const hotProducts = products.filter(
    (product) => Array.isArray(product.tags) && product.tags.includes("hot")
  );
  console.log(hotProducts);
  if (loading) return <div>Loading products...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  return (
    <Carousel variant="dark" className="mb-4 mt-5 " style={{background: "#ffffffff"}}>
      {hotProducts.length > 0 && (
        hotProducts.slice(0, 3).map((product) => (
          <Carousel.Item key={product.id}>
            <div className='d-flex justify-content-center align-items-center' style={{ height: "400px" }}>
              <img className="d-block" style={{ maxHeight: "100%", maxWidth: "100%" }} src={product.image} alt={product.title} />
              <Carousel.Caption className='d-flex justify-content-center gap-5' style={{ paddingTop: "200px" }}>
                <h5 className='text-dark'>{product.title}</h5>
                <div className="fw-bold fs-5">
                  {product.salePrice ? (
                    <>
                      <span style={{ textDecoration: "line-through", color: "#888" }}>
                        ${product.price}
                      </span>{" "}
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <strong style={{ color: "red" }}>${product.salePrice}</strong>
                      </motion.span>
                    </>
                  ) : (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <span>${product.price}</span>
                    </motion.span>
                )}
                </div>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))
      )
      }
    </Carousel >
  );
}
