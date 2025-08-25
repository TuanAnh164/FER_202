import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { ProductsProvider } from "./contexts/ProductContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { CartProvider } from "./contexts/CartContext";
import { FavouriteProvider } from "./contexts/FavouriteContext";
import { Toast, ToastContainer } from "react-bootstrap";
import { ToastContext, ToastProvider } from "./contexts/ToastContext";
import { useContext } from "react";
function AppLayout({ children }) {
  const { state, dispatch } = useContext(ToastContext);

  return (
    <div className="d-flex flex-column min-vh-100" >
      <Header />
      <main className=" flex-grow-1" style={{ minHeight: "70vh", background: "#4a4e51ff" }}>{children}</main>
      <Footer className="bg-dark text-white text-center " />
      <ToastContainer
        position="bottom-end"
        className="p-3"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          zIndex: 9999,
        }}
      >
        <Toast
          bg="light"
          show={state.show}
          onClose={() => dispatch({ type: "HIDE" })}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-dark fw-medium">
            {state.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <FavouriteProvider>
          <CartProvider>
            <BrowserRouter>
              <ProductsProvider>
                <AppLayout>
                  <ProtectedRoute />
                </AppLayout>
              </ProductsProvider>
            </BrowserRouter>
          </CartProvider>
        </FavouriteProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

