import React, { useState } from "react";

const Game = () => {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timer, setTimer] = useState(5);
  const [showNext, setShowNext] = useState(false);

  const goNext = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setAnswer("");
    setIsCorrect(null);
    setShowNext(false);
    setTimer(5);
  };
  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = num1 + num2;
    if (parseInt(answer) === correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setScore(score - 1);
      setIsCorrect(false);
    }
    goNext();
  };

  React.useEffect(() => {
    if (timer > 0 && isCorrect === null) {
      const timerId = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (timer === 0 && isCorrect === null) {
      setScore(score - 1);
      setIsCorrect(false);
      setShowNext(true);
    }
  }, [timer, isCorrect]);

  return (
    <div>
      <h1>Math Game</h1>
      {isCorrect === null && (
        <p>
          {num1} + {num2} =?
        </p>
      )}
      {isCorrect === false && (
        <p>Incorrect. The correct answer is {num1 + num2}.</p>
      )}
      <form onSubmit={handleSubmit}>
        <input type="number" value={answer} onChange={handleAnswerChange} />
        <button type="submit" disabled={timer == 0}>
          Submit
        </button>
      </form>

      {showNext && <button onClick={goNext}>Next</button>}
      {timer > 0 && isCorrect === null && <p>Time remaining: {timer}</p>}
      {<p>Your score is {score}.</p>}
    </div>
  );
};

export default Game;
