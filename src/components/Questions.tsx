import React, { useState, useEffect } from 'react';

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

const Question: React.FC<QuestionProps> = ({ questionData, onAnswerSelected }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedOption(null);
    setError(null);
  }, [questionData]);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    const isCorrect = index === questionData.answer;
    onAnswerSelected(isCorrect);
  };

  return (
    <div className="p-4 rounded shadow-md">
      {error ? (
        <div className="text-red-600 font-semibold">{error}</div>
      ) : (
        <>
          <img src={questionData.imageUrl} alt="Question"/>
          <h2 className="text-lg font-semibold p-4">{questionData.question}</h2>
          <ul>
            {questionData.options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`p-2 border rounded cursor-pointer ${
                  selectedOption === index
                    ? index === questionData.answer
                      ? 'bg-green-200'
                      : 'bg-red-200'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Question;
