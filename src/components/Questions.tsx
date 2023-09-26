import React, { useState, useEffect } from "react";

interface QuestionProps {
  questionData: {
    question: string;
    options: string[];
    answer: number;
    imageUrl: string;
    time: number;
  };
  onAnswerSelected: (isCorrect: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({
  questionData,
  onAnswerSelected,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [displayAnswer, setDisplayAnswer] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { answer, imageUrl, options, question, time } = questionData;

  useEffect(() => {
    setSelectedOption(null);
    setError(null);
    setDisplayAnswer(null);
  }, [questionData]);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    const isCorrect = index === answer;
    onAnswerSelected(isCorrect);
    if (!isCorrect) {
      setDisplayAnswer(true);
    }
  };

  return (
    <div className="p-4 rounded-b-lg shadow-md bg-gray-50">
      {error ? (
        <div className="text-red-600 font-semibold">{error}</div>
      ) : (
        <>
          <div className="md:max-w-md flex justify-center item-center">
            <img src={imageUrl} alt="Question" className="max-w-xs h-1/5" />
          </div>
          <h2 className="text-lg font-semibold p-4">{question}</h2>
          <ul>
            {options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrect = index === answer;
              let optionClasses = "";

              if (isSelected) {
                if (isCorrect) {
                  optionClasses += "bg-green-500 text-white"; // Selected and correct
                } else {
                  optionClasses += "bg-red-500 text-white"; // Selected and incorrect
                }
              } 

              return (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`p-2 rounded-lg mb-2 cursor-pointer border ${
                    displayAnswer && isCorrect ? "bg-green-500 text-white" : optionClasses
                  }`}
                >
                  {(displayAnswer || isSelected) && isCorrect && (
                    <span className="text-white font-bold p-4">&#10003;</span> // Checkmark symbol for correct
                  )}
                  {isSelected && !isCorrect && (
                    <span className="text-white font-bold p-4">&#10007;</span> // Checkmark symbol for incorrect
                  )}
                  {option}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Question;
