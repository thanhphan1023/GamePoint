import React from 'react';
import Point from './Point';

const GameBoard = ({ numbers, onClickNumber,isPlaying }) => {
    return (
        <div className="relative flex justify-center items-center h-[470px] border-2 border-gray-700 rounded-lg mt-2">
            {numbers.map(num => (
                <Point
                    key={num.id}
                    value={num.value}
                    x={num.x}
                    y={num.y}
                    clicked={num.clicked}
                    fading={num.fading}
                    totalPoints={numbers.length}
                    onClick={() => onClickNumber(num.id)}
                />
            ))}
        </div>
    );
};

export default GameBoard;
