import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import "./App.css";

const App = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "";
  const [name, setName] = useState("");

  if (userName) {
    return <Navigate to="chat" replace />;
  }

  const handleSetName = () => {
    if (name) {
      localStorage.setItem("userName", name);
      navigate("chat");
    }
  };

  return (
    <div className="App">
      <div className="username">
        <h3>Please set your name</h3>
        <input value={name} placeholder="Input your name" onChange={(e) => setName(e.target.value)} />
        <button type="button" onClick={handleSetName}>
          Set Your Name
        </button>
      </div>
    </div>
  );
};

export default App;
