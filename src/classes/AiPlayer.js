import Player from './Player';

export default class AiPlayer extends Player {
  constructor(isMyTurn) {
    super(isMyTurn);
  }

  makeRandomMove(opponent) {
    const { sizeX, sizeY } = this._myGameBoard.getSize();

    let moveResult = 0;
    while (this._isMyTurn) {
      const y = Math.floor(Math.random() * sizeX);
      const x = Math.floor(Math.random() * sizeY);
      moveResult = this.makeMove(opponent, x, y);
    }
    return moveResult;
  }
}
