import "./App.css";
import AppRoutes from "./rootes/AppRoutes.jsx";
import { useState } from "react";
function App() {
   const [user, setUser] = useState(null);
  return (
    <>
      <div className=" py-4">
        <AppRoutes user={user} setUser={setUser} />
      </div>
    </>
  );
}

export default App;
