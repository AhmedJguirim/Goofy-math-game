import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to={"/"}>game</Link>
      <Link to={"/login"}>login</Link>
      <Link to={"/register"}>register</Link>
    </nav>
  );
};

export default Nav;
