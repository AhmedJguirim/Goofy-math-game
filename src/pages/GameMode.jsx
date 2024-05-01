import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const GameMode = () => {
  const { updateUser, userData } = useContext(UserContext);
  const navigate = useNavigate();
  const startOnIronManMode = () => {
    navigate("/ironMan");
  };
  const startOnSandBoxMode = () => {
    navigate("/game");
  };
  useEffect(() => {
    if (!userData?.name) {
      navigate("/login");
    }
  }, [userData]);
  return (
    <div>
      <div>max record in sandbox: {userData?.record}</div>
      <div>max combo in ironMan: {userData?.maxCombo}</div>
      <div>gold: {userData?.gold ? userData?.gold : 0}</div>
      <div>
        <button onClick={startOnIronManMode}>ironman</button>
      </div>
      <div>
        <button onClick={startOnSandBoxMode}>sandbox</button>
      </div>
    </div>
  );
};

export default GameMode;
