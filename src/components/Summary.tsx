import React from 'react';

interface SummaryProps {
  totalQuestions: number;
  correctAnswers: number;
  onPlayAgain: () => void;
}

const Summary: React.FC<SummaryProps> = ({ totalQuestions, correctAnswers, onPlayAgain }) => {
  return (
    <div className="bg-white p-4 text-2xl rounded shadow-md flex flex-col justify-center item-center">
      <h2 className="text-lg font-semibold mb-4 text-center">Quiz Summary</h2>
      <p className="text-gray-700 text-center">
       Score:
      </p>
      <p className='text-gray-700 text-center'>{correctAnswers}/ {totalQuestions}</p>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
        onClick={onPlayAgain}
      >
        Play Again
      </button>
    </div>
  );
};

export default Summary;
