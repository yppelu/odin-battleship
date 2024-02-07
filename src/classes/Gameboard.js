import Ship from './Ship.js';

export default class Gameboard {
  static getBoard() {
    const board = new Array(10);
    for (let y = 0; y < board.length; y++) {
      board[y] = new Array(10);
      for (let x = 0; x < board[y].length; x++) {
        board[y][x] = 0;
      }
    }
    return board;
  }

  constructor() {
    this.#board = Gameboard.getBoard();
  }

  #board;
  #ships = [];

  #isPlaceAvailable(x, y, length, direction) {
    if (direction === 'vertical') {
      if (y + length >= this.#board.length) return false;

      for (let i = 0; i < length; i++) {
        if (this.#board[y + i][x]) return false;
      }
    }

    if (direction === 'horizontal') {
      if (x + length >= this.#board[y].length) return false;

      for (let i = 0; i < length; i++) {
        if (this.#board[y][x + i]) return false;
      }
    }

    return true;
  }

  getSize() {
    const sizeY = this.#board.length;
    const sizeX = this.#board[0].length;

    return { sizeY, sizeX };
  }

  placeShip(x, y, length, direction) {
    if (this.#isPlaceAvailable(x, y, length, direction)) {
      const ship = new Ship(length);

      if (direction === 'vertical') {
        for (let i = 0; i < length; i++) {
          this.#board[y + i][x] = ship;
        }
      }

      if (direction === 'horizontal') {
        for (let i = 0; i < length; i++) {
          this.#board[y][x + i] = ship;
        }
      }

      this.#ships.push(ship);
      return true;
    }

    return false;
  }

  receiveAttack(x, y) {
    if (this.#board[y][x] === 1 || this.#board[y][x] === 2) return 0;

    if (this.#board[y][x] === 0) {
      this.#board[y][x] = 1;
      return 1;
    }

    const ship = this.#board[y][x];

    ship.hit();
    this.#board[y][x] = 2;

    if (ship.isSunk()) {
      const shipIndex = this.#ships.indexOf(ship);
      this.#ships.splice(shipIndex, 1);
    }

    return (this.#ships.length) ? 1 : 2;
  }
}
