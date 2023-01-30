import React, { useState, useEffect, useRef, useReducer } from "react";
import Axios from "axios";
import JSONDATA from "../MOCK_DATA.json";
function Home({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [reducerVal, forceUpdate] = useReducer((x) => x + 1, 0);
  const inbox = useRef([]);
  setTimeout(function () {
    window.location.reload();
    // forceUpdate();
  }, 10000);
  useEffect(() => {
    Axios.get("https://task6serverside.herokuapp.com/getUsers").then(
      (response) => {
        setUsers(response.data);
      }
    );
  }, []);
  users.forEach((user) => {
    if (user.recipiant === currentUser) {
      console.log("working");
      inbox.current = [...inbox.current, user];
      inbox.current = [...new Set(inbox.current)];
    }
  });
  console.log(inbox.current);
  const handleSubmit = (e) => {
    let recipiant = document.querySelector(".recipiant").value;
    let subject = document.querySelector(".subject").value;
    let message = document.querySelector(".textarea").value;
    e.preventDefault();
    Axios.post("https://task6serverside.herokuapp.com/createUser", {
      from: currentUser,
      recipiant: recipiant,
      message: {
        subject: subject,
        message: message,
      },
    });
    alert("sent");
    document.querySelector(".recipiant").value = "";
    document.querySelector(".subject").value = "";
    document.querySelector(".textarea").value = "";
  };

  return (
    <div className="home">
      <nav>
        <h2>@mailike</h2>
        <h2>welcome {currentUser}</h2>
      </nav>
      <form onSubmit={handleSubmit}>
        <input
          value={searchTerm}
          className="recipiant"
          placeholder="to whom"
          type="text"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          required
        />
        {JSONDATA.filter((val) => {
          if (
            searchTerm &&
            val.first_name
              .toLocaleLowerCase()
              .startsWith(searchTerm.toLocaleLowerCase()) &&
            val.first_name.toLocaleLowerCase() !==
              searchTerm.toLocaleLowerCase()
          ) {
            return val;
          }
        })
          .slice(0, 6)
          .map((val) => {
            return (
              <div className="autocomplition">
                <p
                  onClick={() =>
                    setSearchTerm(val.first_name.toLocaleLowerCase())
                  }
                >
                  {val.first_name.toLocaleLowerCase()}
                </p>
              </div>
            );
          })}
        <input
          className="subject"
          placeholder="subject..."
          type="text"
          // onChange={(e) => {
          //   setSubject(e.target.value);
          // }}
          required
        />
        <textarea
          className="textarea"
          cols="50"
          rows="10"
          // onChange={(e) => {
          //   setMessage(e.target.value);
          // }}
          required
        ></textarea>
        <button type="submit">Send</button>
      </form>
      <div className="inbox">
        <h3>Inbox</h3>
        <div id="inbox">
          {[...new Set(inbox.current)].map((inb) => {
            let index = inbox.current.length;
            if (inbox.current.indexOf(inb) < index) {
              return (
                <div className="inboxBody">
                  From: {inb.from} <br />
                  Title: {inb.message.subject} <br />
                  Message: {inb.message.message}
                </div>
              );
            } else {
              return <></>;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
