import { useEffect, useState } from 'react';

import Gameboard from './classes/Gameboard.js';

import Board from './components/Board/Board';
import Header from './components/Header/Header.jsx';

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
  }, [isPlayersTurn]);

  return (
    <>
      <Header isGameOn={isGameOn} isPlayersTurn={isPlayersTurn} />
      <main className='main'>
        <div className='board-wrapper'>
          <p className='board-description'>Your grid</p>
          <Board host='player' gameBoard={playersBoard} isTurnAvailable={!isPlayersTurn} />
        </div>
        <div className='board-wrapper'>
          <p className='board-description'>AI&apos;s grid</p>
          <Board host='ai' gameBoard={aiBoard} isTurnAvailable={isPlayersTurn} makeMove={handlePlayersMove} />
        </div>
      </main>
      <footer className='grid-controls'>
        <button className="grid-controls__get-random-ships-brn" type='button'>Randomise</button>
      </footer>
    </>
  );
}

export default App;
