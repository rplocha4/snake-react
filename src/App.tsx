import { useCallback, useEffect, useState } from 'react';

import './App.css';
import GameBoard from './components/GameBoard';

const gameSize = 35;

function App() {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [direction, setDirection] = useState('right');
  const [food, setFood] = useState({
    x: Math.floor(Math.random() * (gameSize - 1)),
    y: Math.floor(Math.random() * (gameSize - 1)),
  });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [maxScore, setMaxScore] = useState(
    localStorage.getItem('maxScore') || 0
  );

  const handleFoodCollision = () => {
    setScore((prevScore) => prevScore + 1);
    setFood({
      x: Math.floor(Math.random() * (gameSize - 1)),
      y: Math.floor(Math.random() * (gameSize - 1)),
    });
    setSnake((s) => {
      const newSnake = [...s];
      const tail = newSnake[0];
      newSnake.unshift(tail);
      return newSnake;
    });
  };
  const resetHandler = () => {
    setGameOver(false);
    setSnake([{ x: 0, y: 0 }]);
    setDirection('right');
    setFood({
      x: Math.floor(Math.random() * (gameSize - 1)),
      y: Math.floor(Math.random() * (gameSize - 1)),
    });
    setScore(0);
  };
  const gameOverHandler = useCallback(() => {
    setGameOver(true);
    const maxScore = localStorage.getItem('maxScore') || 0;
    setMaxScore(Math.max(score, +maxScore));
    localStorage.setItem('maxScore', `${Math.max(score, +maxScore)}`);
  }, [score]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        setPaused((prevPaused) => !prevPaused);
        return;
      } else if (e.key === 'R' || e.key === 'r') {
        resetHandler();
        return;
      }

      setDirection((prevDirection) => {
        switch (e.key) {
          case 'ArrowUp':
            if (prevDirection === 'down') {
              return prevDirection;
            }
            return 'up';
          case 'ArrowDown':
            if (prevDirection === 'up') {
              return prevDirection;
            }
            return 'down';
          case 'ArrowLeft':
            if (prevDirection === 'right') {
              return prevDirection;
            }
            return 'left';
          case 'ArrowRight':
            if (prevDirection === 'left') {
              return prevDirection;
            }
            return 'right';
          default:
            return prevDirection;
        }
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const handleDirection = useCallback(
    (head: { x: number; y: number }) => {
      switch (direction) {
        case 'right':
          return { x: head.x + 1, y: head.y };
        case 'left':
          return { x: head.x - 1, y: head.y };
        case 'up':
          return { x: head.x, y: head.y - 1 };
        case 'down':
          return { x: head.x, y: head.y + 1 };
      }
      return head;
    },
    [direction]
  );

  useEffect(() => {
    const moveSnake = () => {
      setSnake((s) => {
        const newSnake = [...s];

        const head = newSnake[newSnake.length - 1];
        const newHead = handleDirection(head);

        if (newHead.x < 0) {
          newHead.x = gameSize - 1;
        }
        if (newHead.x > gameSize - 1) {
          newHead.x = 0;
        }
        if (newHead.y < 0) {
          newHead.y = gameSize - 1;
        }
        if (newHead.y > gameSize - 1) {
          newHead.y = 0;
        }
        if (food.x === newHead.x && food.y === newHead.y) {
          handleFoodCollision();
        }

        if (newSnake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
          gameOverHandler();
          return newSnake;
        }

        newSnake.push(newHead);
        newSnake.shift();

        return newSnake;
      });
    };
    !gameOver && !paused && moveSnake();
    const interval = setInterval(() => {
      !gameOver && !paused && moveSnake();
    }, 50);
    return () => clearInterval(interval);
  }, [handleDirection, gameOverHandler, food, gameOver, paused]);

  return (
    <div className="bg-black h-screen w-full flex gap-2 justify-center items-center  text-white">
      <div className="flex flex-col gap-2 justify-center items-center relative">
        <div className=" text-4xl flex justify-between items-center w-full">
          <p>Score: {score}</p>
          <p>Top score: {maxScore}</p>
        </div>
        <GameBoard size={gameSize} snake={snake} food={food} />
        {paused && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col gap-10 justify-center items-center">
            <h1 className=" text-6xl">Paused!</h1>
          </div>
        )}
        {gameOver && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col gap-10 justify-center items-center">
            <h1 className=" text-6xl">Game Over!</h1>
            <button
              onClick={() => {
                resetHandler();
              }}
              className=" text-4xl bg-opacity-50 hover:bg-opacity-100 bg-green-500 px-10 py-5 rounded-xl"
              // style={{ outline: 'none' }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      <div className="">
        <p>Space - pause/unpause</p>
        <p>R - reset</p>
      </div>
    </div>
  );
}

export default App;
