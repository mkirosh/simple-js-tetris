import { unit } from './settings.json';

export default class Coordenate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  inUnits() {
    return new Coordenate(this.x*unit, this.y*unit)
  }

  isZero() {
    return this.x == 0 && this.y == 0
  }
}