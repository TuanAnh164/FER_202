import logo from './logo.svg';
import './App.css';

function App({ myName }) {
  return (
    <div className="App">
      <h1>Hello React</h1>
      <p>My name is, {myName}</p>
    </div>
  );
}

export default App;
