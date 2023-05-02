import { useEffect, useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';

const gameSize = 25;

function App() {
  const [snake, setSnake] = useState([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
  ]);
  const [direction, setDirection] = useState('right');

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
            // newSnake.push({ x: head.x + 1, y: head.y });
            break;
          case 'left':
            newHead = { x: head.x - 1, y: head.y };
            // newSnake.push({ x: head.x - 1, y: head.y });
            break;
          case 'up':
            newHead = { x: head.x, y: head.y - 1 };
            // newSnake.push({ x: head.x, y: head.y - 1 });
            break;
          case 'down':
            newHead = { x: head.x, y: head.y + 1 };
            // newSnake.push({ x: head.x, y: head.y + 1 });
            break;
        }
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
    }, 600);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <>
      <div className="bg-black h-screen w-full flex justify-center items-center">
        <GameBoard size={gameSize} snake={snake} />
      </div>
    </>
  );
}

export default App;
