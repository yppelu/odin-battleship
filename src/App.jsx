import { useEffect, useState } from 'react';

import Gameboard from './classes/Gameboard.js';

import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';

const initialPlayersBoard = new Gameboard();
initialPlayersBoard.placeRandomShips();
const initialAiBoard = new Gameboard();
initialAiBoard.placeRandomShips();

function App() {
  const [playersBoard, setPlayersBoard] = useState(initialPlayersBoard);
  const [aiBoard, setAiBoard] = useState(initialAiBoard);
  const [isGameOn, setIsGameOn] = useState(false);
  const [isPlayersTurn, setIsPlayersTurn] = useState(true);

  function handlePlayersMove(x, y) {
    if (isGameOn) {
      const newAiBoard = Gameboard.cloneBoard(aiBoard);
      const result = newAiBoard.receiveAttack(x, y);
      if (result === 1 || result === 2) {
        setAiBoard(newAiBoard);
        setIsPlayersTurn(false);
      }
    }
  }

  function setNewRandomShips() {
    const newPlayersBoard = Gameboard.cloneBoard(playersBoard);
    newPlayersBoard.placeRandomShips();
    setPlayersBoard(newPlayersBoard);

    const newAiBoard = Gameboard.cloneBoard(aiBoard);
    newAiBoard.placeRandomShips();
    setAiBoard(newAiBoard);
  }

  useEffect(() => {
    setIsPlayersTurn([true, false][Math.floor(Math.random() * 2)]);
  }, []);

  useEffect(() => {
    if (!isPlayersTurn && isGameOn) {
      const { sizeX, sizeY } = Gameboard.getBoardSize();
      const newPlayersBoard = Gameboard.cloneBoard(playersBoard);

      let moveResult = 0;
      while (moveResult === 0) {
        const y = Math.floor(Math.random() * sizeX);
        const x = Math.floor(Math.random() * sizeY);
        moveResult = newPlayersBoard.receiveAttack(x, y);
      }
      setTimeout(() => {
        setPlayersBoard(newPlayersBoard);
        setIsPlayersTurn(true);
      }, 500);

    }
  }, [isPlayersTurn, isGameOn, playersBoard]);

  return (
    <>
      <Header isGameOn={isGameOn} isPlayersTurn={isPlayersTurn} />
      <Main
        playersBoard={playersBoard}
        aiBoard={aiBoard}
        isPlayersTurn={isPlayersTurn}
        makeMove={handlePlayersMove}
      />
      <footer className='grid-controls'>
        <button
          className='grid-controls__grid-control-btn'
          type='button'
          onClick={setNewRandomShips}
        >
          Randomize &#8635;
        </button>
      </footer>
    </>
  );
}

export default App;
