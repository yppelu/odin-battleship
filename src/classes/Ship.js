export default class Ship {
  static cloneShip(ship) {
    const newShip = new Ship(ship._length);
    newShip._hitTimes = ship._hitTimes;
    return newShip;
  }

  constructor(length) {
    this._length = length;
  }

  _length;
  _hitTimes = 0;

  hit() {
    if (this.isSunk()) return false;

    this._hitTimes++;
    return true;
  }

  isSunk() {
    return this._hitTimes === this._length;
  }
}
