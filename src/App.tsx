import './App.css';
import GameBoard from './components/GameBoard';

const gameSize = 25;


function App() {


  return (
    <>
      <div className="bg-black h-screen w-full flex justify-center items-center">
        <GameBoard size={gameSize} />
      </div>
    </>
  );
}

export default App;
