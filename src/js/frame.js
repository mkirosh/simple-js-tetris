import axis from './axis.json';

export default class Frame {
  constructor(position, direction) { 
    this.position = position;
    this.direction = direction;
  }

  axes() {
    return axis[this.direction];
  }
}