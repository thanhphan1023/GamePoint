import { useState, useEffect, useRef } from "react";

const useTime = () => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return; // tránh chạy nhiều lần
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 0.1);
    }, 100);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(0);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return { time, start, reset, stop };
};

export default useTime;
