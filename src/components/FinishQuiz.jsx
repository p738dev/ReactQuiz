import React from "react";

const FinishQuiz = ({ points, totalPoints, dispatch }) => {
  const percentage = (points / totalPoints) * 100;

  return (
    <>
      <p className="result">
        Your score: <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(percentage)})
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishQuiz;
