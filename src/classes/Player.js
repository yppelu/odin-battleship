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
}
