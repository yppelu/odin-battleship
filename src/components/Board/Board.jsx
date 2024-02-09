import './Board.css';

export default function Board({ host, gameBoard, isTurnAvailable, makeMove }) {
  const board = gameBoard.getBoard();

  return (
    <div className='board'>
      {
        board.map((line, y) => line.map((cell, x) => {
          return (
            <div
              key={`${x},${y}`}
              className={
                cell === 1 ? 'board__cell board__cell--miss' :
                  cell === 2 ? 'board__cell board__cell--hit' :
                    host === 'ai' ? 'board__cell' :
                      cell ? 'board__cell board__cell--busy'
                        : 'board__cell'
              }
              onClick={() => {
                if (isTurnAvailable) {
                  makeMove(x, y);
                }
              }
              }></div>
          );
        }))
      }
    </div>
  );
}
