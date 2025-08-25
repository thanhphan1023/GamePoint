import React, { useEffect, useState } from 'react';

const Point = ({ value, x, y, clicked, fading, onClick }) => {
    const [countdown, setCountdown] = useState(null);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        let interval;
        if (clicked) {
            setCountdown(3.0); 
            setOpacity(1);

            interval = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 0.05) {
                        clearInterval(interval);
                        return 0;
                    }
                    return (prev - 0.1).toFixed(1); 
                });

                // giảm opacity tỉ lệ thuận countdown
                setOpacity(prevOpacity => Math.max(prevOpacity - 0.016, 0));
            }, 100); // cập nhật mỗi 0.1s (hợp với hiển thị 1 số thập phân)
        }
        return () => clearInterval(interval);
    }, [clicked]);

    return (
        <div
            onClick={onClick}
            style={{
                position: 'absolute',
                top: `${y}%`,
                left: `${x}%`,
                width: '40px',
                height: '40px',
                border: clicked ? 'none' : '1px solid red',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: clicked ? 'rgba(220, 0, 0, 0.6)' : 'white',
                color: clicked ? 'white' : 'black',
                fontSize: '14px',
                cursor: 'pointer',
                userSelect: 'none',
                opacity: clicked ? opacity : (fading ? 0 : 1),
                transition: 'opacity 0.2s linear'
            }}
        >
            <div>{value}</div>
            {clicked && countdown !== null && (
                <div style={{ fontSize: '10px', marginTop: '2px', opacity: 0.8 }}>
                    {countdown}s
                </div>
            )}
        </div>
    );
};

export default Point;
