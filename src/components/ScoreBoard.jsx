import React from 'react';

const ScoreBoard = ({ point, setPoint, time, setNumbers, isStatus, isGameOver }) => {
  return (
    <div className="text-xl mb-5">
      <div className="text-xl mb-5">
        {isGameOver
          ? <span className="text-red-500 font-bold">GAME OVER</span>
          : isStatus
          ? <span className="text-green-500 font-bold">ALL CLEARED</span>
          : "LET'S PLAY"}
      </div>

      {/* Points */}
      <div className="flex items-center gap-[80px] mb-5 mt-5">
        <h1 className="font-semibold">Points :</h1>
        <input
          type="number"
          value={point === 0 ? '' : point}
          onChange={(e) => {
            let val = e.target.value;

            if (val === '') {
              setPoint(0);
              setNumbers([]);
              return;
            }

            const num = Number(val);
            if (num > 0) {
              setPoint(num);
            }
          }}
          className="border-2 border-gray-500 rounded px-2 py-1 w-48"
        />
      </div>

      {/* Time */}
      <div className="flex items-center gap-[90px] mb-4">
        <h1 className="font-semibold">Time :</h1>
        <span className="text-lg">{time.toFixed(1)} s</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
