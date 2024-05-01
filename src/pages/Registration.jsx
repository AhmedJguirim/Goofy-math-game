import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const { updateUser, userData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.name) {
      navigate("/");
    }
  }, [updateUser]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:3001/api/addPlayer", {
        name,
        password,
      })
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => console.error(err));
    // fetch("profile.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const newUser = { name, password };
    //     const updatedUsers = [...data, newUser];
    //     return fetch("profile.json", {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(updatedUsers),
    //     });
    //   })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("User registered successfully:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error registering user:", error);
    //   });
  };

  return (
    <div>
      <h1>Register :D</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="username"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="top secret :)"
          onChange={handlePasswordChange}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Registration;
