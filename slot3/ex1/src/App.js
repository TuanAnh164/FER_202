import "./App.css";
import React, { useState } from "react";

function App() {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchClick, setSearchClick] = useState("");
  const [sortType, setSortType] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleSearch = () => {
    setSearchClick(searchTerm.trim());
  };

  const filteredCompanies = companies
    .filter((c) =>
      searchClick
        ? c.name.toLowerCase().includes(searchClick.toLowerCase())
        : true
    )
    .filter((c) => (categoryFilter ? c.category === categoryFilter : true))
    .sort((a, b) => {
      if (sortType === "startAsc") return a.start - b.start;
      if (sortType === "startDesc") return b.start - a.start;
      if (sortType === "duration") return b.end - b.start - (a.end - a.start);
      return 0;
    });

  // Style object
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#fafafa",
      minHeight: "100vh",
    },
    controls: {
      marginBottom: "15px",
      gap: "10px",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    input: {
      padding: "6px 10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    button: {
      padding: "6px 12px",
      border: "none",
      backgroundColor: "#007bff",
      color: "white",
      borderRadius: "4px",
      cursor: "pointer",
    },
    select: {
      padding: "6px 10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    table: {
      marginInline: "auto",
      textAlign: "left",
      borderCollapse: "collapse",
      minWidth: "500px",
      backgroundColor: "white",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    th: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "8px",
    },
    td: {
      padding: "8px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: "center" }}>Company List</h1>
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          style={styles.select}
        >
          <option value="">Sort by...</option>
          <option value="startAsc">Start Year ↑</option>
          <option value="startDesc">Start Year ↓</option>
          <option value="duration">By Duration</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">All Categories</option>
          <option value="Finance">Finance</option>
          <option value="Retail">Retail</option>
          <option value="Auto">Auto</option>
          <option value="Technology">Technology</option>
        </select>
      </div>

      {filteredCompanies.length > 0 ? (
        <table style={styles.table} border="1" cellPadding="0">
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Start</th>
              <th style={styles.th}>End</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                }}
              >
                <td style={styles.td}>{company.name}</td>
                <td style={styles.td}>{company.category}</td>
                <td style={styles.td}>{company.start}</td>
                <td style={styles.td}>{company.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No result</p>
      )}
    </div>
  );
}

export default App;
