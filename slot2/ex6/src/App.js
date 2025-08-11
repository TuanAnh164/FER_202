import React from 'react';

function App() {
  const people = [
    {name: 'Jack', age: 50},
    {name: 'Michael', age: 9},
    {name: 'John', age: 40},
    {name: 'Ann', age: 19},
    {name: 'Elisabeth', age: 16}
  ];

  const firstTeenager = people.find(person => person.age >= 10 && person.age <= 20);

  const allTeenagers = people.filter(person => person.age >= 10 && person.age <= 20);

  const everyIsTeenager = people.every(person => person.age >= 10 && person.age <= 20);

  const anyIsTeenager = people.some(person => person.age >= 10 && person.age <= 20);

  return (
    <div>
      <h1>ES6 People Array Exercises</h1>
      
      <div>
        <h2>Original people array:</h2>
        {people.map((person, index) => (
          <div key={index}>
            <p>{person.name} is {person.age} years old.</p>
          </div>
        ))}
      </div>

      <div>
        <h2>1. First teenager:</h2>
        <p>{firstTeenager.name} is {firstTeenager.age} years old.</p>
      </div>

      <div>
        <h2>2. All teenagers:</h2>
        {allTeenagers.map((person, index) => (
          <div key={index}>
            <p>{person.name} is {person.age} years old.</p>
          </div>
        ))}
      </div>

      <div>
        <h2>3. Every person is teenager:</h2>
        <div>{JSON.stringify(everyIsTeenager)}</div>
      </div>

      <div>
        <h2>4. Any person is teenager:</h2>
        <div>{JSON.stringify(anyIsTeenager)}</div>
      </div>
    </div>
  );
}

export default App;