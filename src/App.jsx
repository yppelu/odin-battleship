import { useEffect, useState } from 'react';

import Gameboard from './classes/Gameboard.js';

import Board from './components/Board/Board';
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
      const result = initialAiBoard.receiveAttack(x, y);
      if (result === 1 || result === 2) {
        setAiBoard(initialAiBoard);
        setIsPlayersTurn(false);
      }
    }
  }

  useEffect(() => {
    setIsPlayersTurn([true, false][Math.floor(Math.random() * 2)]);
  }, []);

  useEffect(() => {
    if (!isPlayersTurn && isGameOn) {
      const { sizeX, sizeY } = Gameboard.getBoardSize();

      let moveResult = 0;
      while (moveResult === 0) {
        const y = Math.floor(Math.random() * sizeX);
        const x = Math.floor(Math.random() * sizeY);
        moveResult = initialPlayersBoard.receiveAttack(x, y);
      }
      setTimeout(() => {
        setPlayersBoard(initialPlayersBoard);
        setIsPlayersTurn(true);
      }, 500);

    }
  }, [isPlayersTurn, isGameOn]);

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
          className='grid-controls__get-random-ships-btn'
          type='button'
        >
          Randomize &#8635;
        </button>
      </footer>
    </>
  );
}

export default App;
