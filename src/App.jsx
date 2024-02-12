import { useEffect, useState } from 'react';

import Gameboard from './classes/Gameboard.js';
import Ai from './classes/Ai.js';

import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';
import GridControlsBlock from './components/GridControlsBlock/GridControlsBlock.jsx';

function App() {
  const [playersBoard, setPlayersBoard] = useState(new Gameboard());
  const [aiBoard, setAiBoard] = useState(new Gameboard());
  const [aiPlayer, setAiPlayer] = useState(new Ai());
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
      }
      if (moveResult === 3) {
        setAiBoard(newAiBoard);
        handleEndGame('player');
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

  function areBoardsFresh() {
    const ai = aiBoard.getBoard();
    const player = playersBoard.getBoard();
    let areShipsThere = false;

    for (let i = 0; i < ai.length; i++) {
      for (let j = 0; j < ai[i].length; j++) {
        if (ai[i][j] === 1 || ai[i][j] === 2 || player[i][j] === 1 || player[i][j] === 2) {
          return false;
        }
        if (typeof ai[i][j] === 'object' && typeof player[i][j] === 'object') {
          areShipsThere = true;
        }
      }
    }

    return (areShipsThere) ? true : false;
  }

  function handleStartGame() {
    if (!areBoardsFresh()) {
      setNewRandomShips();
    } else {
      setWinner('');
    }

    setAiPlayer(new Ai());
    setIsPlayersTurn([true, false][Math.floor(Math.random() * 2)]);
    setIsGameOn(true);
  }

  function handleEndGame(winner) {
    if (winner) setWinner(winner);
    setIsGameOn(false);
  }

  useEffect(() => {
    if (!isPlayersTurn && isGameOn) {
      const newPlayersBoard = Gameboard.cloneBoard(playersBoard);
      const newAiPlayer = Ai.clone(aiPlayer);

      const moveResult = newAiPlayer.makeMove(newPlayersBoard);

      setTimeout(() => {
        setAiPlayer(newAiPlayer);
        setPlayersBoard(newPlayersBoard);
        if (moveResult === 1) setIsPlayersTurn(true);
        if (moveResult === 2) {
          setIsPlayersTurn(true);
          setIsPlayersTurn(false);
        }
        if (moveResult === 3) handleEndGame('ai');
      }, 750);

    }
  }, [isPlayersTurn, isGameOn, aiPlayer, playersBoard]);

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
