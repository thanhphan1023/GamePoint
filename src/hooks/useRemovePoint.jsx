import { useState, useRef, useEffect } from "react";

const useRemovePoint = () => {
  const [points, setPoints] = useState([]);
  const timeoutsRef = useRef([]);

  const removePoint = (id) => {
    // Click đổi màu
    setPoints(prev =>
      prev.map(p =>
        p.id === id ? { ...p, clicked: true } : p
      )
    );

    // Sau 3s thì xoá hẳn
    const removeTimeout = setTimeout(() => {
      setPoints(prev => prev.filter(p => p.id !== id));
    }, 3000);

    timeoutsRef.current.push(removeTimeout);
  };

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(tid => clearTimeout(tid));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  return { points, setPoints, removePoint, clearAllTimeouts };
};

export default useRemovePoint;
