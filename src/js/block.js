import Coordenate from './coordenate.js';
import Frame from './frame.js';

export default class Block {
  constructor(frame, initialPosition) {
    this.frame = frame;
    this.initialPosition = initialPosition;
    this.assertParams();
    this.relPosition = _.memoize(this.relPosition.bind(this), () => this.frame.direction);
  }

  assertParams() {
    // CheckTypes.assert.instance(this.frame, Frame, "expected frame to be Frame")
    // CheckTypes.assert.instance(this.initialPosition, Coordenate, "expected position to be Coordenate")
  }

  relPosition() {
    const { abscissa, ordenate } = this.frame.axes();
    const x = this.initialPosition[abscissa.axis] * abscissa.polarity;
    const y = this.initialPosition[ordenate.axis] * ordenate.polarity;
    return new Coordenate(x, y);
  }

  absPosition() {
    const x = this.relPosition().x + this.frame.position.x;
    const y = this.relPosition().y + this.frame.position.y;
    return new Coordenate(x, y);
  }
}