import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const { updateUser, userData } = useContext(UserContext);
  const navigate = useNavigate();
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (userData?.name) {
      navigate("/mode");
    }
  }, [userData]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:3001/api/auth", {
        name,
        password,
      })
      .then((res) => {
        updateUser(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Login :D</h1>
      <form action="" onSubmit={handleSubmit}>
        {updateUser.data}
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
      <Link to={"/register"}>register</Link>
    </div>
  );
};

export default Login;
