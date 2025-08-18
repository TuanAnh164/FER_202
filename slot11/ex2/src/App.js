import { useState } from "react";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudentsPage from "./pages/StudentsPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [quickSearch, setQuickSearch] = useState("");

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar onQuickSearch={setQuickSearch} />
      <div className="flex-grow-1">
        <StudentsPage quickSearch={quickSearch} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
