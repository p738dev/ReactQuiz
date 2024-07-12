import React, { useEffect, useReducer } from "react";
import { dataReducer, initialState } from "./dataReducer";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartQuiz from "./components/StartQuiz";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishQuiz from "./components/FinishQuiz";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const App = () => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const numQuestions = state.questions.length;
  const totalPoints = state.questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <StartQuiz
            numQuestions={numQuestions}
            dispatch={dispatch}
          />
        )}
        {state.status === "active" && (
          <>
            <Progress
              index={state.index}
              numQuestions={numQuestions}
              points={state.points}
              totalPoints={totalPoints}
              answer={state.answer}
            />
            <Question
              question={state.questions[state.index]}
              dispatch={dispatch}
              answer={state.answer}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                time={state.time}
              />
              <NextButton
                dispatch={dispatch}
                answer={state.answer}
                numQuestions={numQuestions}
                index={state.index}
              />
            </Footer>
          </>
        )}
        {state.status === "finished" && (
          <FinishQuiz
            points={state.points}
            totalPoints={totalPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
