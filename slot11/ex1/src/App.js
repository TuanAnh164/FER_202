import logo from './logo.svg';
import './App.css';
import ProfileForm from './components/ProfileForm';

function App() {
  const handleSubmit = () => {
  };

  return (
    <div className="App">
      <ProfileForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
