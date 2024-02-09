import Ship from './Ship.js';

export default class Gameboard {
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

  static getBoardSize() {
    return { sizeX: 10, sizeY: 10 };
  }

  static cloneBoard(board) {
    const newBoard = new Gameboard();
    newBoard._board = board._board;
    newBoard._ships = board._ships;
    return newBoard;
  }

  constructor() {
    this._board = Gameboard.getBoard();
  }

  _board;
  _ships = [];

  _isPlaceAvailable(x, y, length, direction) {
    const isCellAvailable = (x, y) => {
      for (let a = y - 1; a <= y + 1; a++) {
        for (let b = x - 1; b <= x + 1; b++) {
          if (this._board[a] && this._board[a][b]) return false;
        }
      }
      return true;
    };

    if (direction === 'vertical') {
      if (y + length >= this._board.length) return false;

      for (let i = 0; i < length; i++) {
        if (!isCellAvailable(x, y + i)) return false;
      }
    }

    if (direction === 'horizontal') {
      if (x + length >= this._board[y].length) return false;

      for (let i = 0; i < length; i++) {
        if (!isCellAvailable(x + i, y)) return false;
      }
    }

    return true;
  }

  placeShip(x, y, length, direction) {
    if (this._isPlaceAvailable(x, y, length, direction)) {
      const ship = new Ship(length);

      if (direction === 'vertical') {
        for (let i = 0; i < length; i++) {
          this._board[y + i][x] = ship;
        }
      }

      if (direction === 'horizontal') {
        for (let i = 0; i < length; i++) {
          this._board[y][x + i] = ship;
        }
      }

      this._ships.push(ship);
      return true;
    }

    return false;
  }

  placeRandomShips() {
    this.clearBoard();

    const sizeY = this._board.length;
    const sizeX = this._board[0].length;
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
    this._board = Gameboard.getBoard();
  }

  receiveAttack(x, y) {
    if (this._board[y][x] === 1 || this._board[y][x] === 2) return 0;

    if (this._board[y][x] === 0) {
      this._board[y][x] = 1;
      return 1;
    }

    const ship = this._board[y][x];

    ship.hit();
    this._board[y][x] = 2;

    if (ship.isSunk()) {
      const shipIndex = this._ships.indexOf(ship);
      this._ships.splice(shipIndex, 1);
    }

    return (this._ships.length) ? 1 : 2;
  }

  getBoard() {
    return JSON.parse(JSON.stringify(this._board));
  }
}
