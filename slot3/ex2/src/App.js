import { Routes, Route, Link } from "react-router-dom";
import PersonList from "./components/PersonList";
import FilterPage from "./components/FilterPage";
import SkillRanking from "./components/SkillRanking";
import SearchSortPage from "./components/SearchSortPage";

export default function App() {
  return (
    <div className="container mt-3">
      <nav className="mb-4">
        <Link className="btn btn-primary me-2" to="/">Danh sách</Link>
        <Link className="btn btn-secondary me-2" to="/filter">Lọc</Link>
        <Link className="btn btn-success me-2" to="/ranking">Xếp hạng</Link>
        <Link className="btn btn-warning" to="/search">Tìm kiếm </Link>
      </nav>

      <Routes>
        <Route path="/" element={<PersonList />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/ranking" element={<SkillRanking />} />
        <Route path="/search" element={<SearchSortPage />} />
      </Routes>
    </div>
  );
}
