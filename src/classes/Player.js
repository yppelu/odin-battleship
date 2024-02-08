export default class Player {
  makeMove(opponentBoard, x, y) {
    return opponentBoard.receiveAttack(x, y);
  }
}
