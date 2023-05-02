import { useEffect, useState } from 'react';

import './App.css';
import GameBoard from './components/GameBoard';

const gameSize = 25;

function App() {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [direction, setDirection] = useState('right');
  const [food, setFood] = useState({ x: 10, y: 10 });
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          setDirection((prevDir) => {
            if (prevDir === 'left') {
              return 'left';
            }
            return 'right';
          });
          break;
        case 'ArrowLeft':
          setDirection((prevDir) => {
            if (prevDir === 'right') {
              return 'right';
            }
            return 'left';
          });
          break;
        case 'ArrowUp':
          setDirection((prevDir) => {
            if (prevDir === 'down') {
              return 'down';
            }
            return 'up';
          });
          break;
        case 'ArrowDown':
          setDirection((prevDir) => {
            if (prevDir === 'up') {
              return 'up';
            }
            return 'down';
          });
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const moveSnake = () => {
      setSnake((s) => {
        const newSnake = [...s];
        const head = newSnake[newSnake.length - 1];
        let newHead = { x: head.x, y: head.y };
        switch (direction) {
          case 'right':
            newHead = { x: head.x + 1, y: head.y };
            break;
          case 'left':
            newHead = { x: head.x - 1, y: head.y };
            break;
          case 'up':
            newHead = { x: head.x, y: head.y - 1 };
            break;
          case 'down':
            newHead = { x: head.x, y: head.y + 1 };
            break;
        }
        if (newHead.x === food.x && newHead.y === food.y) {
          let newFoodPosition = {
            x: Math.floor(Math.random() * gameSize),
            y: Math.floor(Math.random() * gameSize),
          };
          while (
            s.some(
              (snake) =>
                snake.x === newFoodPosition.x && snake.y === newFoodPosition.y
            )
          ) {
            newFoodPosition = {
              x: Math.floor(Math.random() * gameSize),
              y: Math.floor(Math.random() * gameSize),
            };
          }

          setFood(newFoodPosition);
          setScore((prevScore) => prevScore + 1);

          setSnake((s) => {
            const newSnake = [...s];
            newSnake.push({ x: food.x, y: food.y });
            return newSnake;
          });
        }
        if (newHead.x < 0) {
          newHead.x = gameSize;
        }
        if (newHead.x > gameSize) {
          newHead.x = 0;
        }
        if (newHead.y < 0) {
          newHead.y = gameSize;
        }
        if (newHead.y > gameSize) {
          newHead.y = 0;
        }

        if (newSnake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
          console.log('game over');
        }
        newSnake.push(newHead);
        newSnake.shift();

        return newSnake;
      });
    };
    moveSnake();
    const interval = setInterval(() => {
      moveSnake();
    }, 100);
    return () => clearInterval(interval);
  }, [direction, food]);

  return (
    <>
      <div className="bg-black h-screen w-full flex flex-col justify-center items-center">
        <div className="text-white text-4xl">Score: {score}</div>
        <GameBoard
          size={gameSize}
          snake={snake}
          food={food}
          direction={direction}
        />
      </div>
    </>
  );
}

export default App;
