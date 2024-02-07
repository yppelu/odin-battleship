import Player from './Player';

export default class AiPlayer extends Player {
  constructor(isMyTurn) {
    super(isMyTurn);
  }

  #isMyTurn;
  #board;

  makeRandomMove(opponent) {
    while (this.#isMyTurn) {
      const y = Math.floor(Math.random() * this.#board.length);
      const x = Math.floor(Math.random() * this.#board[y].length);
      this.makeMove(opponent, x, y);
    }
  }
}
