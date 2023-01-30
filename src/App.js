import React, { useState } from "react";
import Home from "./components/Home";
import Name from "./components/Name";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  return (
    <div>
      {!currentUser ? (
        <Name setCurrentUser={setCurrentUser} currentUser={currentUser} />
      ) : (
        <Home currentUser={currentUser} />
      )}
    </div>
  );
}
export default App;
