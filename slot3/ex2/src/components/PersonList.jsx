import { useState } from "react";
import { persons } from "../data/person";

export default function PersonList() {
  const [list, setList] = useState(persons);
  const [asc, setAsc] = useState(true);

  const sortByFirstName = () => {
    const sorted = [...list].sort((a, b) =>
      asc ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName)
    );
    setList(sorted);
    setAsc(!asc);
  };

  return (
    <div>
      <h2>List</h2>
      <button className="btn btn-info mb-3" onClick={sortByFirstName}>
        Sort First Name {asc ? "A → Z" : "Z → A"}
      </button>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Full Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {list.map(p => (
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
