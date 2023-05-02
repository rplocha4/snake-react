import React, { useState } from 'react';

const GameBoard: React.FC<{
  size: number;
  snake: { x: number; y: number }[];
  food: { x: number; y: number };
}> = ({ size, snake, food }) => {
  const game = [...Array(size)].map((_) => Array(size).fill(0));
  const head = snake[snake.length - 1];

  return (
    <div className="game flex flex-col bg-gray-500">
      {game.map((row, i) => (
        <div className="row flex " key={i}>
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
            >
              {food.x === j && food.y === i && (
                <div className="w-full h-full flex justify-center items-center">
                  🍎
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
