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
  const [victory, setVictory] = useState({ isVictory: false, winner: '' });

  function handlePlayersMove(x, y) {
    if (isGameOn) {
      const newAiBoard = Gameboard.cloneBoard(aiBoard);
      const result = newAiBoard.receiveAttack(x, y);
      if (result === 1 || result === 2) {
        setAiBoard(newAiBoard);
        if (result === 2) {
          setIsGameOn(false);
          setVictory({ isVictory: true, winner: 'player' });
        } else {
          setIsPlayersTurn(false);
        }
      }
    }
  }

  function setNewRandomShips() {
    setVictory({ isVictory: false, winner: '' });

    const newPlayersBoard = Gameboard.cloneBoard(playersBoard);
    newPlayersBoard.placeRandomShips();
    setPlayersBoard(newPlayersBoard);

    const newAiBoard = Gameboard.cloneBoard(aiBoard);
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
    setVictory({ isVictory: false, winner: '' });
    if (!areBoardsNew()) {
      setNewRandomShips();
    }
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
        setPlayersBoard(newPlayersBoard);
        if (moveResult === 2) {
          setIsGameOn(false);
          setVictory({ isVictory: true, winner: 'ai' });
        } else {
          setIsPlayersTurn(true);
        }
      }, 500);

    }
  }, [isPlayersTurn, isGameOn, playersBoard]);

  return (
    <>
      <Header isGameOn={isGameOn} isPlayersTurn={isPlayersTurn} victory={victory} />
      <Main
        playersBoard={playersBoard}
        aiBoard={aiBoard}
        isPlayersTurn={isPlayersTurn}
        makeMove={handlePlayersMove}
      />
      <GridControlsBlock
        isGameOn={isGameOn}
        setNewRandomShips={setNewRandomShips}
        startGame={handleStartGame}
        endGame={handleEndGame}
      />
    </>
  );
}

export default App;
