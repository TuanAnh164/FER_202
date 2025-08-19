import { useState } from "react";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import StudentsPage from "./pages/StudentsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
function App() {
  const [quickSearch, setQuickSearch] = useState("");

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar onQuickSearch={setQuickSearch} />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<StudentsPage quickSearch={quickSearch} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
