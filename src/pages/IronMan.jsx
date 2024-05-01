import React, { useState, useReducer, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialState = {
  maxTime: 60,
  combo: 0,
  answer: "",
  hearts: 2,
  points: 0,
  lost: false,
};

const addGold = (amount, playerId) => {
  axios
    .post(`http://127.0.0.1:3001/api/addGoldIronMan`, {
      amount,
      id: playerId,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
};
const reducer = (state, action) => {
  switch (action.type) {
    case "TIME_END":
      addGold(state.points, state.id);
      return {
        ...state,
        combo: 0,
        answer: "",
        lost: true,
      };
    case "CORRECT":
      if (state.combo >= 10) {
        return {
          ...state,
          points: state.points + 1 * (state.combo / 10 + 1),
          combo: state.combo + 1,
          answer: "",
        };
      } else {
        return {
          ...state,
          points: state.points + 1,
          combo: state.combo + 1,
          answer: "",
        };
      }

    case "FAIL_MISTAKE":
      if (state.hearts === 0) {
        addGold(state.points, state.id);
        return {
          ...state,
          combo: 0,
          answer: "",
          lost: true,
        };
      } else {
        return {
          ...state,
          combo: 0,
          hearts: state.hearts - 1,
          answer: "",
        };
      }
    case "USER_TYPES":
      return {
        ...state,
        answer: action.payload,
      };
    case "RESET":
      return {
        ...state,
        lost: false,
        hearts: 2,
      };
    case "SETUP_IRONMAN":
      return {
        ...state,
        maxCombo: action.payload.maxCombo,
        id: action.payload.id,
      };

    default:
      return state;
  }
};

const IronMan = () => {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = num1 + num2;
    if (parseInt(state.answer) === correctAnswer) {
      dispatch({
        type: "CORRECT",
      });

      if (userData.maxCombo < state.combo) {
        axios
          .put(`http://127.0.0.1:3001/api/updateCombo/${userData.id}`, {
            combo: state.combo,
          })
          .then((res) => {
            console.log(res);
            updateUser({ ...userData, maxCombo: state.combo });
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
    if (!userData?.name) {
      navigate("/login");
    }

    dispatch({
      type: "SETUP_IRONMAN",
      payload: { id: userData?.id, maxCombo: userData?.maxCombo },
    });
  }, [userData]);
  React.useEffect(() => {
    if (timer > 0 && state.lost == false) {
      console.log(state);
      const timerId = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timer <= 0) {
      dispatch({
        type: "TIME_END",
        payload: {},
      });
    }
  }, [timer]);

  return (
    <div>
      <h1>Math Game</h1>
      <h4>chances remaining : {state.hearts}</h4>
      <h4>current maximum combo: {state.maxCombo}</h4>
      {!state.lost && (
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

      <p>Combo x{state.combo}!</p>
      {state.lost === true ? <p>Timout..</p> : null}
      {timer > 0 && (
        <p>Time remaining: {(Math.round(timer * 100) / 100).toFixed(2)}</p>
      )}
      {state.lost && (
        <button
          onClick={() => {
            dispatch({
              type: "RESET",
              payload: {},
            });
            newQuestion();
            setTimer(state.maxTime);
          }}
        >
          Start over
        </button>
      )}
    </div>
  );
};

export default IronMan;
