import './Main.css';

import Board from '../Board/Board';

export default function Main({ playersBoard, aiBoard, isPlayersTurn, makeMove }) {
  return (
    <main className='main'>
      <div className='board-wrapper'>
        <p className='board-description'>Your grid</p>
        <Board host='player' gameBoard={playersBoard} isTurnAvailable={!isPlayersTurn} />
      </div>
      <div className='board-wrapper'>
        <p className='board-description'>AI&apos;s grid</p>
        <Board host='ai' gameBoard={aiBoard} isTurnAvailable={isPlayersTurn} makeMove={makeMove} />
      </div>
    </main>
  );
}
