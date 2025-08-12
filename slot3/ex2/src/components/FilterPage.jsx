import { useState } from "react";
import { persons } from "../data/person";

export default function FilterPage() {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [skill, setSkill] = useState("");
  
  const skillsList = [...new Set(persons.flatMap(p => p.skills))];

  const filtered = persons.filter(p => {
    const matchAge = (!min || p.age >= min) && (!max || p.age <= max);
    const matchSkill = !skill || p.skills.includes(skill);
    return matchAge && matchSkill;
  });

  return (
    <div>
      <h2>Lọc theo tuổi & Skill</h2>
      <div className="row mb-3">
        <div className="col">
          <input type="number" className="form-control" placeholder="Min Age" value={min} onChange={e => setMin(e.target.value)} />
        </div>
        <div className="col">
          <input type="number" className="form-control" placeholder="Max Age" value={max} onChange={e => setMax(e.target.value)} />
        </div>
        <div className="col">
          <select className="form-select" value={skill} onChange={e => setSkill(e.target.value)}>
            <option value="">-- Skill --</option>
            {skillsList.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-danger">No found.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Skill</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>{p.firstName}</td>
                <td>{p.lastName}</td>
                <td>{p.skills.join(", ")}</td>
                <td>{p.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
