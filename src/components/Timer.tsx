import React, { useEffect, useState } from "react";

interface TimerProps {
  durationInSeconds: number;
  onTimeElapsed: () => void;
}

const Timer: React.FC<TimerProps> = ({ durationInSeconds, onTimeElapsed }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(durationInSeconds);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if (secondsRemaining > 0) {
      const timerId = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      onTimeElapsed();
    }
  }, [secondsRemaining, onTimeElapsed]);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      {error ? (
        <div className="text-red-600 font-semibold">{error}</div>
      ) : (
        <div className="text-lg font-semibold">
          Time Remaining: {secondsRemaining} seconds
        </div>
      )}
    </div>
  );
};

export default Timer;
