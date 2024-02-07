import Gameboard from './Gameboard.js';

export default class Player {
  constructor(isMyTurn) {
    this.#isMyTurn = isMyTurn;
    this.#board = new Gameboard();
  }

  #board;
  #isMyTurn;

  makeMove(opponent, x, y) {
    if (this.#isMyTurn) {
      const moveResult = opponent.receiveAttack(x, y);
      if (moveResult === 1 || moveResult === 2) this.#isMyTurn = false;
    }
  }

  receiveAttack(x, y) {
    const moveResult = this.#board.receiveAttack(x, y);
    if (moveResult === 1) this.#isMyTurn = true;
    return moveResult;
  }

  placeRandomShips() {
    const ships = [2, 3, 3, 4, 5];
    const directions = ['horizontal', 'vertical'];

    for (let i = ships.length - 1; i >= 0; i--) {
      let x, y, direction;
      do {
        y = Math.floor(Math.random() * this.#board.length);
        x = Math.floor(Math.random() * this.#board[y].length);
        direction = directions[Math.floor(Math.random() * 2)];
      } while (!this.#board.placeShip(x, y, ships[i], direction));
    }
  }
}
