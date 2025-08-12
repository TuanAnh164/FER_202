import { useState } from "react";
import { persons } from "../data/person";

export default function SearchSortPage() {
  const [search, setSearch] = useState("");

  const filtered = persons
    .filter(p =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a.isActive !== b.isActive) return b.isActive - a.isActive;
      if (a.age !== b.age) return a.age - b.age;
      return a.lastName.localeCompare(b.lastName);
    });

  const stats = persons.reduce(
    (acc, p) => {
      acc.total++;
      acc.totalAge += p.age;
      if (p.isActive) acc.active++;
      return acc;
    },
    { total: 0, totalAge: 0, active: 0 }
  );

  return (
    <div>
      <h2>Tìm kiếm & Sắp xếp</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Nhập tên..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Full Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id}>
              <td>{p.firstName} {p.lastName}</td>
              <td>{p.age}</td>
              <td>{p.city}</td>
              <td>{p.isActive ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="alert alert-info">
        <p><b>Tổng số người:</b> {stats.total}</p>
        <p><b>Tuổi trung bình:</b> {(stats.totalAge / stats.total).toFixed(1)}</p>
        <p><b>Số người active:</b> {stats.active}</p>
      </div>
    </div>
  );
}
