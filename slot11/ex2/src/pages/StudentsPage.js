import { useState, useMemo } from "react";
import { Container } from "react-bootstrap";
import { students as studentData } from "../data/students";
import Filters from "../components/Filters";
import SortDropdown from "../components/SortDropdown";
import StudentGrid from "../components/StudentGrid";
import StudentDetailModal from "../components/StudentDetailModal";
import Hero from "../components/Hero";

export default function StudentsPage({ quickSearch }) {
  const [filters, setFilters] = useState({ search: "", ageRange: "", hasAvatar: false });
  const [sortOption, setSortOption] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    return studentData
      .filter((s) => {
        const keyword =  quickSearch.toLowerCase();
        if (keyword && !(s.name.toLowerCase().includes(keyword) || s.email.toLowerCase().includes(keyword))) return false;
        if (filters.ageRange === "≤20" && s.age > 20) return false;
        if (filters.ageRange === "21-25" && (s.age < 21 || s.age > 25)) return false;
        if (filters.ageRange === ">25" && s.age <= 25) return false;
        if (filters.hasAvatar && !s.avatar) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "ageAsc": return a.age - b.age;
          case "ageDesc": return b.age - a.age;
          case "nameAsc": return a.name.localeCompare(b.name);
          case "nameDesc": return b.name.localeCompare(a.name);
          default: return 0;
        }
      });
  }, [filters, sortOption, quickSearch]);

  return (
    <Container>
      <Hero />
      <Filters filters={filters} setFilters={setFilters} />
      <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
      <StudentGrid students={filteredStudents} onView={setSelectedStudent} />
      <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
    </Container>
  );
}
