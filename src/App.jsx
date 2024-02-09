import { useEffect, useState } from 'react';

import Gameboard from './classes/Gameboard.js';

import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';
import GridControlsBlock from './components/GridControlsBlock/GridControlsBlock.jsx';

const initialPlayersBoard = new Gameboard();
initialPlayersBoard.placeRandomShips();
const initialAiBoard = new Gameboard();
initialAiBoard.placeRandomShips();

function App() {
  const [playersBoard, setPlayersBoard] = useState(initialPlayersBoard);
  const [aiBoard, setAiBoard] = useState(initialAiBoard);
  const [isGameOn, setIsGameOn] = useState(false);
  const [isPlayersTurn, setIsPlayersTurn] = useState(true);
  const [winner, setWinner] = useState('');

  function handlePlayersMove(x, y) {
    if (isGameOn) {
      const newAiBoard = Gameboard.cloneBoard(aiBoard);
      const moveResult = newAiBoard.receiveAttack(x, y);
      if (moveResult === 1) {
        setAiBoard(newAiBoard);
        setIsPlayersTurn(false);
      }
      if (moveResult === 2) {
        setAiBoard(newAiBoard);
        setWinner('player');
        setIsGameOn(false);
      }
    }
  }

  function setNewRandomShips() {
    setWinner('');

    const newPlayersBoard = new Gameboard();
    newPlayersBoard.placeRandomShips();
    setPlayersBoard(newPlayersBoard);

    const newAiBoard = new Gameboard();
    newAiBoard.placeRandomShips();
    setAiBoard(newAiBoard);
  }

  function areBoardsNew() {
    const ai = aiBoard.getBoard();
    const player = playersBoard.getBoard();

    for (let i = 0; i < ai.length; i++) {
      for (let j = 0; j < ai[i].length; j++) {
        if (ai[i][j] === 1 || ai[i][j] === 2 || player[i][j] === 1 || player[i][j] === 2) {
          return false;
        }
      }
    }

    return true;
  }

  function handleStartGame() {
    if (!areBoardsNew()) {
      setNewRandomShips();
    }
    setWinner('');
    setIsPlayersTurn([true, false][Math.floor(Math.random() * 2)]);
    setIsGameOn(true);
  }

  function handleEndGame() {
    setIsGameOn(false);
  }

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
        if (moveResult === 1) {
          setPlayersBoard(newPlayersBoard);
          setIsPlayersTurn(true);
        }
        if (moveResult === 2) {
          setPlayersBoard(newPlayersBoard);
          setWinner('ai');
          setIsGameOn(false);
        }
      }, 500);

    }
  }, [isPlayersTurn, isGameOn, playersBoard]);

  return (
    <>
      <Header isGameOn={isGameOn} isPlayersTurn={isPlayersTurn} winner={winner} />
      <GridControlsBlock
        isGameOn={isGameOn}
        setNewRandomShips={setNewRandomShips}
        startGame={handleStartGame}
        endGame={handleEndGame}
      />
      <Main
        playersBoard={playersBoard}
        aiBoard={aiBoard}
        isPlayersTurn={isPlayersTurn}
        makeMove={handlePlayersMove}
      />
    </>
  );
}

export default App;
