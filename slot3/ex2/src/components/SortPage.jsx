import React, { useState } from "react";
import { persons } from "../data/person";

export default function SortPage() {
  const [sortAsc, setSortAsc] = useState(true);

  const sorted = [...persons].sort((a, b) => {
    if (a.firstName < b.firstName) return sortAsc ? -1 : 1;
    if (a.firstName > b.firstName) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="container mt-4">
      <style>{`
        .custom-title { color: #2c3e50; font-weight: bold; }
        .custom-btn { background: #3498db; color: white; border-radius: 8px; padding: 6px 12px; border: none; }
        .custom-btn:hover { background: #217dbb; }
        table { border-radius: 6px; overflow: hidden; }
      `}</style>

      <h2 className="custom-title mb-3">Sort by First Name</h2>
      <button className="custom-btn mb-3" onClick={() => setSortAsc(!sortAsc)}>
        Sort {sortAsc ? "A → Z" : "Z → A"}
      </button>

      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Full Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(p => (
            <tr key={p.id}>
              <td>{p.firstName} {p.lastName}</td>
              <td>{p.age}</td>
              <td>{p.city}</td>
              <td>{p.skills.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
