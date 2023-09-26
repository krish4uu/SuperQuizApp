import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./components/Questions";
import Timer from "./components/Timer";
import Summary from "./components/Summary";
import Navbar from "./components/Navbar";

const API_URL = "https://scs-interview-api.herokuapp.com/questions";

function App() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(API_URL);
        setQuestions(response.data);
      } catch (error) {
        setApiError("Error fetching questions from the API.");
      }
    };

    fetchQuestions();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);

    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  const handleAnswerSelected = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimerKey((prev) => prev + 1);
      } else {
        setShowSummary(true);
      }
    }, 1000);
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setShowSummary(false);
    setTimerKey((prev) => prev + 1);
  };

  const themeClass = darkMode ? "bg-gray-900" : "bg-white";

  return (
    <>
      <div
        className={`min-h-screen overflow-y-hidden flex items-center justify-center text-black m-0 p-0  ${themeClass}`}
      >
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div
          className={`container mx-auto max-w-lg rounded-lg shadow-lg p-4 rounded-lg ring-1 ring-slate-900/5 shadow-xl ${themeClass}`}
        >
          {apiError ? (
            <div className={`text-red-600 font-semibold`}>{apiError}</div>
          ) : currentQuestionIndex < questions.length && !showSummary ? (
            <>
              <Timer
                key={timerKey}
                durationInSeconds={questions[currentQuestionIndex].time}
                onTimeElapsed={() => {
                  if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex((prev) => prev + 1);
                    setTimerKey((prev) => prev + 1);
                  } else {
                    setShowSummary(true);
                  }
                }}
              />
              <Question
                questionData={questions[currentQuestionIndex]}
                onAnswerSelected={handleAnswerSelected}
              />
            </>
          ) : (
            <Summary
              totalQuestions={questions.length}
              correctAnswers={correctAnswers}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
