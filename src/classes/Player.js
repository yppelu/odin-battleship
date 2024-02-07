import Gameboard from './Gameboard.js';

export default class Player {
  constructor(isMyTurn) {
    this._isMyTurn = isMyTurn;
    this._myGameBoard = new Gameboard();
  }

  _myGameBoard;
  _isMyTurn;

  makeMove(opponent, x, y) {
    if (this._isMyTurn) {
      const moveResult = opponent.receiveAttack(x, y);
      if (moveResult === 1 || moveResult === 2) this._isMyTurn = false;
      return moveResult;
    }
  }

  receiveAttack(x, y) {
    const moveResult = this._myGameBoard.receiveAttack(x, y);
    if (moveResult === 1) this._isMyTurn = true;
    return moveResult;
  }

  placeRandomShips() {
    const { sizeX, sizeY } = this._myGameBoard.getSize();
    const ships = [2, 3, 3, 4, 5];
    const directions = ['horizontal', 'vertical'];

    for (let i = ships.length - 1; i >= 0; i--) {
      let x, y, direction;
      do {
        y = Math.floor(Math.random() * sizeY);
        x = Math.floor(Math.random() * sizeX);
        direction = directions[Math.floor(Math.random() * 2)];
      } while (!this._myGameBoard.placeShip(x, y, ships[i], direction));
    }
  }
}
