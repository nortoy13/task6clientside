import React, { useState, useEffect } from "react";

function Name({ setCurrentUser, currentUser }) {
  const [name, setName] = useState("");
  useEffect(() => {
    const data = sessionStorage.getItem("CurrrentUser");
    if (data !== null) {
      setCurrentUser(JSON.parse(data));
    }
  }, []);

  const createUser = () => {
    setCurrentUser(name);
    sessionStorage.setItem("CurrrentUser", JSON.stringify(name));
  };

  return (
    <div className="name">
      <h1>Enter your name</h1>
      <div>
        <input
          type="text"
          required
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button onClick={createUser}>Submit</button>
      </div>
    </div>
  );
}

export default Name;
