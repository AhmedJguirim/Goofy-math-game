import React, { useState, useReducer, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const initialState = {
  maxTime: 5,
  score: 0,
  fail: false,
  answer: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FAIL_TIMER":
      return {
        ...state,
        maxTime: state.maxTime + 1,
        score: state.score - 1,
        fail: true,
        answer: "",
        timeout: true,
      };
    case "WIN":
      let newTime = state.maxTime - 0.3;
      if (newTime >= 2) {
        return {
          ...state,
          maxTime: state.maxTime - 0.3,
          score: state.score + 1,
          fail: false,
          answer: "",
        };
      } else {
        return {
          ...state,
          maxTime: 2,
          score: state.score + 2,
          fail: false,
          answer: "",
        };
      }

    case "FAIL_MISTAKE":
      return {
        ...state,
        maxTime: state.maxTime,
        score: state.score - 1,
        fail: true,
        answer: "",
      };
    case "USER_TYPES":
      return {
        ...state,
        answer: action.payload,
      };
    case "RESET":
      return {
        ...state,
        fail: false,
        timeout: false,
      };
    case "SET_RECORD":
      return {
        ...state,
        record: action.payload,
      };
    default:
      return state;
  }
};

const Game = () => {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [timer, setTimer] = useState(state.maxTime);
  const { updateUser, userData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAnswerChange = (e) => {
    dispatch({
      type: "USER_TYPES",
      payload: e.target.value,
    });
  };
  const newQuestion = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setTimer(state.maxTime);
    dispatch({
      type: "RESET",
      payload: {},
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = num1 + num2;
    if (parseInt(state.answer) === correctAnswer) {
      dispatch({
        type: "WIN",
        payload: timer,
      });

      if (userData.record < state.score) {
        axios
          .put(`http://127.0.0.1:3001/api/updateRecord/${userData.id}`, {
            record: state.score,
          })
          .then((res) => {
            console.log(res);
            updateUser({ ...userData, record: state.score });
          })
          .catch((err) => console.error(err));
      }
    } else {
      dispatch({
        type: "FAIL_MISTAKE",
        payload: {},
      });
    }
    newQuestion();
  };
  useEffect(() => {
    if (!userData?.loggedIn) {
      navigate("/login");
    }
    console.log(userData);
    dispatch({ type: "SET_RECORD", payload: userData?.record });
  }, [userData]);
  React.useEffect(() => {
    if (timer > 0 && state.fail == false) {
      const timerId = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timer <= 0) {
      console.log("llol");
      dispatch({
        type: "FAIL_TIMER",
        payload: {},
      });
    }
  }, [timer]);

  return (
    <div>
      <h1>Math Game</h1>
      <h4>current record: {state.record}</h4>
      {!state.timeout && (
        <p>
          {num1} + {num2} =?
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={state.answer}
          onChange={handleAnswerChange}
        />
        <button type="submit">Submit</button>
      </form>

      <p>Your score is {state.score}.</p>
      {state.timeout === true ? <p>Timout..</p> : null}
      {timer > 0 && (
        <p>Time remaining: {(Math.round(timer * 100) / 100).toFixed(2)}</p>
      )}
      {state.timeout && <button onClick={newQuestion}>Next question</button>}
    </div>
  );
};

export default Game;
