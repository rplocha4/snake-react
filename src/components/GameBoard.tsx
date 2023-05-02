import React, { useState } from 'react';

const GameBoard: React.FC<{ size: number; snake: any }> = ({ size, snake }) => {
  const [game, setGame] = useState(Array(size).fill(Array(size).fill(0)));

  return (
    <div className="game flex flex-col gap-0.5">
      {game.map((row, i) => (
        <div className="row flex gap-0.5" key={i}>
          {row.map((cell, j) => (
            <div
              className={`w-5 h-5 ${
                snake.some((s) => {
                  return s.x === j && s.y === i;
                })
                  ? 'bg-green-500'
                  : 'bg-gray-500'
              }
            
            })}`}
              key={j}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
