import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { apiListProducts, apiCreateProduct, apiRemoveProduct, apiUpdateProduct } from "../api/product";

const ProductsCtx = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load danh sách sản phẩm
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await apiListProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Thêm sản phẩm mới
  const addProduct = useCallback(async (payload) => {
    setLoading(true);
    setError("");
    try {
      const newProduct = await apiCreateProduct(payload);
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      console.error("Failed to add product:", err);
      setError("Failed to add product");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Xóa sản phẩm theo ID
  const removeProduct = useCallback(async (id) => {
    setLoading(true);
    setError("");
    try {
      await apiRemoveProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to remove product:", err);
      setError("Failed to remove product");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cập nhật sản phẩm
  const updateProduct = useCallback(async (id, payload) => {
    setLoading(true);
    setError("");
    try {
      const updated = await apiUpdateProduct(id, payload);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    } catch (err) {
      console.error("Failed to update product:", err);
      setError("Failed to update product");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ProductsCtx.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        removeProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductsCtx.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsCtx);
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider");
  return ctx;
}
