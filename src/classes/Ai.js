import Gameboard from './Gameboard';

export default class Ai {
  static clone(ai) {
    const newAi = new Ai();
    for (let i = 0; i < ai.length; i++) {
      for (let j = 0; j < ai[i].length; j++) {
        newAi._board[i][j] = ai[i][j];
      }
    }
    return newAi;
  }

  constructor() {
    this._board = Gameboard.getBoard();
  }

  makeMove(opponentsBoard) {
    const { sizeX, sizeY } = Gameboard.getBoardSize();

    let x, y;

    let moveResult = 0;
    while (moveResult === 0) {
      y = Math.floor(Math.random() * sizeX);
      x = Math.floor(Math.random() * sizeY);
      moveResult = opponentsBoard.receiveAttack(x, y);
    }

    this._board[y][x] = opponentsBoard.getBoard()[y][x];
    return moveResult;
  }
}
