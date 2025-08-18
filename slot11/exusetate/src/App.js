import React, { useState } from "react";

function App() {
  const [name, setName] = useState("Adam");
  const [age, setAge] = useState(35);

  return (
    <>
      <section>
        <label>
          Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <p>My name is {name}</p>
      </section>

      <section>
        <label>
          Age:{" "}
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </label>
        <p>My age is {age}</p>
      </section>
    </>
  );
}

export default App;
