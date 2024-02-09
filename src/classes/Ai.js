import Gameboard from './Gameboard';

export default class Ai {
  static clone(ai) {
    const newAi = new Ai();
    for (let i = 0; i < ai._board.length; i++) {
      for (let j = 0; j < ai._board[i].length; j++) {
        newAi._board[i][j] = ai._board[i][j];
      }
    }
    return newAi;
  }

  constructor() {
    this._board = Gameboard.getBoard();
  }

  _isThisCellSurrounded(x, y) {
    return (
      (this._board[y - 1] && this._board[y - 1][x] && !this._isThereEngagedCellsInDiagonal(x, y - 1) || !this._board[y - 1]) &&
      (this._board[y + 1] && this._board[y + 1][x] && !this._isThereEngagedCellsInDiagonal(x, y + 1) || !this._board[y + 1]) &&
      this._board[y][x - 1] && !this._isThereEngagedCellsInDiagonal(x - 1, y) &&
      this._board[y][x + 1] && !this._isThereEngagedCellsInDiagonal(x + 1, y)
    );
  }

  _isThereEngagedCellsInDiagonal(x, y) {
    return (
      this._board[y - 1] && this._board[y - 1][x - 1] === 2 ||
      this._board[y - 1] && this._board[y - 1][x + 1] === 2 ||
      this._board[y + 1] && this._board[y + 1][x - 1] === 2 ||
      this._board[y + 1] && this._board[y + 1][x + 1] === 2
    );
  }

  _getCoordinatesAroundHit() {
    let x, y;

    for (let i = 0; i < this._board.length; i++) {
      for (let j = 0; j < this._board[i].length; j++) {
        if (this._board[i][j] === 2) {
          if (this._board[i - 1] && this._board[i - 1][j] === 0 && !this._isThereEngagedCellsInDiagonal(j, i - 1)) {
            x = j;
            y = i - 1;
          } else if (this._board[i][j + 1] === 0 && !this._isThereEngagedCellsInDiagonal(j + 1, i)) {
            x = j + 1;
            y = i;
          } else if (this._board[i + 1] && this._board[i + 1][j] === 0 && !this._isThereEngagedCellsInDiagonal(j, i + 1)) {
            x = j;
            y = i + 1;
          } else if (this._board[i][j - 1] === 0 && !this._isThereEngagedCellsInDiagonal(j - 1, i)) {
            x = j - 1;
            y = i;
          } else {
            continue;
          }

          return [x, y];
        }
      }
    }

    return [-1, -1];
  }

  makeMove(opponentsBoard) {
    const { sizeX, sizeY } = Gameboard.getBoardSize();

    let [x, y] = this._getCoordinatesAroundHit();
    let moveResult = 0;

    if (x === -1 || y === -1) {
      while (!moveResult) {
        y = Math.floor(Math.random() * sizeX);
        x = Math.floor(Math.random() * sizeY);
        if (!this._isThereEngagedCellsInDiagonal(x, y) && !this._isThisCellSurrounded(x, y)) {
          moveResult = opponentsBoard.receiveAttack(x, y);
        }
      }
    } else {
      moveResult = opponentsBoard.receiveAttack(x, y);
    }

    this._board[y][x] = opponentsBoard.getBoard()[y][x];
    return moveResult;
  }
}
