import Ship from './Ship.js';

export default class Gameboard {
  static getBoardSize() {
    return { sizeX: 10, sizeY: 10 };
  }

  static getBoard() {
    const { sizeX, sizeY } = Gameboard.getBoardSize();

    const board = new Array(sizeY);
    for (let y = 0; y < board.length; y++) {
      board[y] = new Array(sizeX);
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
    const isCellAvailable = (x, y) => {
      for (let a = y - 1; a <= y + 1; a++) {
        for (let b = x - 1; b <= x + 1; b++) {
          if (this.#board[a] && this.#board[a][b]) return false;
        }
      }
      return true;
    };

    if (direction === 'vertical') {
      if (y + length >= this.#board.length) return false;

      for (let i = 0; i < length; i++) {
        if (!isCellAvailable(x, y + i)) return false;
      }
    }

    if (direction === 'horizontal') {
      if (x + length >= this.#board[y].length) return false;

      for (let i = 0; i < length; i++) {
        if (!isCellAvailable(x + i, y)) return false;
      }
    }

    return true;
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

  placeRandomShips() {
    this.clearBoard();

    const sizeY = this.#board.length;
    const sizeX = this.#board[0].length;
    const ships = [2, 3, 3, 4, 5];
    const directions = ['horizontal', 'vertical'];

    for (let i = ships.length - 1; i >= 0; i--) {
      let x, y, direction;
      do {
        y = Math.floor(Math.random() * sizeY);
        x = Math.floor(Math.random() * sizeX);
        direction = directions[Math.floor(Math.random() * 2)];
      } while (!this.placeShip(x, y, ships[i], direction));
    }
  }

  clearBoard() {
    this.#board = Gameboard.getBoard();
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
