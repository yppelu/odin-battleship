import Gameboard from './Gameboard.js';
import Player from './Player.js';

export default class AiPlayer extends Player {
  makeMove(opponent) {
    const { sizeX, sizeY } = Gameboard.getBoardSize();

    let moveResult = 0;
    while (moveResult === 0) {
      const y = Math.floor(Math.random() * sizeX);
      const x = Math.floor(Math.random() * sizeY);
      moveResult = super.makeMove(opponent, x, y);
    }
    return moveResult;
  }
}
