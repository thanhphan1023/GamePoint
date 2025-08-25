import './App.css';
import useTime from './hooks/useTime';
import useRemovePoint from './hooks/useRemovePoint';
import { useState, useEffect } from 'react';
import ScoreBoard from './components/ScoreBoard';
import GameBoard from './components/GameBoard';
import { toast } from 'react-toastify';

function App() {
  const { time, start, reset, stop } = useTime();
  const [isPlaying, setIsPlaying] = useState(false);
  const [point, setPoint] = useState(5);
  const [isStatus, setIsStatus] = useState(false); // ALL CLEARED
  const [isGameOver, setIsGameOver] = useState(false); //GAME OVER
  const [nextNumber, setNextNumber] = useState(1);
  const [autoPlay, setAutoPlay] = useState(false); // Auto Play state

  // Hook remove point
  const { points: numbers, setPoints: setNumbers, removePoint, clearAllTimeouts } = useRemovePoint(1000, 300);

  const handlePlay = () => {
    if (point > 2000) {
      toast.warn("Gia tri khong duoc vuot qua 2000");
      return;
    }
    setIsStatus(false);
    setIsGameOver(false);
    setAutoPlay(false); // reset auto play

    reset();
    start();

    setIsPlaying(true);
    setNextNumber(1);

    // Clear timeout cũ để tránh mất số khi restart
    clearAllTimeouts();
    setNumbers([]);
    generateRandomNumbers(point);
  };

  const generateRandomNumbers = (count) => {
    if (!count || count <= 0) {
      setNumbers([]);
      return;
    }
    const nums = [];
    for (let i = 1; i <= count; i++) {
      nums.push({
        id: i,
        value: i,
        x: Math.random() * 90,
        y: Math.random() * 90,
        clicked: false,
        fading: false,
      });
    }
    setNumbers([...nums]);
  };

  const handleClickNumber = (id) => {
    if (!isPlaying || isGameOver) return;
    if (id !== nextNumber) {
      // Sai số -> GAME OVER
      stop();
      setIsPlaying(false);
      setIsGameOver(true);
      return;
    }

    removePoint(id);

    if (nextNumber < point) {
      setNextNumber(prev => prev + 1);
    }
  };

  // Auto Play effect
  useEffect(() => {
    if (!autoPlay || !isPlaying || isGameOver) return;

    const interval = setInterval(() => {
      handleClickNumber(nextNumber);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoPlay, isPlaying, isGameOver, nextNumber]);

  // Khi tất cả số biến mất thì mới dừng game
  useEffect(() => {
    if (isPlaying && numbers.length === 0) {
      stop();
      setIsPlaying(false);
      setIsStatus(true);
    }
  }, [numbers, isPlaying, stop]);

  return (
    <div className="flex justify-center items-center h-screen pt-5">
      <div className="w-[600px] p-5 h-[700px] border-2 border-gray-800 rounded-lg">
        <ScoreBoard
          point={point}
          setPoint={setPoint}
          time={time}
          setNumbers={setNumbers}
          isPlaying={isPlaying}
          isStatus={isStatus}
          isGameOver={isGameOver}
        />

        <div className="flex gap-4 mb-4">
          <button
            onClick={handlePlay}
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded w-32"
          >
            {isPlaying ? "Restart" : "Play"}
          </button>

          {isPlaying && (
            <button
              onClick={() => setAutoPlay(prev => !prev)}
              className={`px-4 py-2 rounded w-32 text-white cursor-pointer ${autoPlay ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                }`}
            >
              {autoPlay ? "Auto Play Off" : "Auto Play On"}
            </button>
          )}
        </div>

        <GameBoard numbers={numbers} onClickNumber={handleClickNumber} isPlaying={isPlaying} />

        <div className="mt-2 font-semibold">
          Next: {isPlaying ? nextNumber : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
