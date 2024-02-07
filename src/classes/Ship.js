export default class Ship {
  constructor(length) {
    this.#length = length;
  }

  #length;
  #hitTimes = 0;

  hit() {
    if (this.isSunk()) return false;

    this.#hitTimes++;
    return true;
  }

  isSunk() {
    return this.#hitTimes === this.#length;
  }
}
