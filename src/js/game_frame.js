import Coordenate from './coordenate.js';
import Figure from './figure.js';
import Frame from './frame.js';

const launchFigure = function() {
  const active = this.active;
  if(this.active) this.deactivated.push(active);
  this.active = new Figure(this.ctx);
}

const boundsCorrection = function(frame, offset = new Coordenate(0,0)) {
  const { upper, lower } = frame.absBounds();
  let upperX = this.width - (upper.x + offset.x)
  let lowerX = (lower.x + offset.x)
  upperX = upperX < 0 ? upperX : 0;
  lowerX = lowerX < 0 ? lowerX : 0;
  return {
    upper: new Coordenate(upperX, 0),
    lower: new Coordenate(lowerX, 0)
  }
}

const lauchMatrix = function(width, height) {
  const mtx = [];
  for(let i = 0; i < height; i++) {
    mtx.push(new Array(width - 1).fill(false));
  }
  return mtx;
}

export default class GameFrame extends Frame {
  constructor(ctx, width, height) {
    super(new Coordenate(0,0), 0);
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.active = null;
    this.deactivated = [];
    this.matrix = lauchMatrix(width, height);
    launchFigure.call(this);
  }

  tick() {
    this.assertAliveInDrop(this.active.frame);
    this.active.frame.drop();
  }

  draw() {
    this.deactivated.map((figure) => { figure.draw() });
    this.active.draw();
  }

  stepRight() {

  }

  assertAliveInDrop(frame) {
    if(this.checkCollision(new Coordenate(0,1))) {
      frame.deactivate();
      launchFigure.call(this);
      this.updateMatrix();
    }
  }

  assertHorizontalStep(step = 1, shift = 0) {
    const offset = new Coordenate((step + shift),0)
    const collide = this.checkCollision(offset);
    const bound = this.checkBounds(offset)
    if(!collide && !bound) {
      this.active.frame.position.x += step;
    }
  }

  checkBounds(offset) {
    const { upper, lower } = boundsCorrection.call(this, this.active.frame, offset);
    return (upper.x != 0 || lower.x != 0)
  }

  checkCollision(offset = new Coordenate(0,0)) {
    let collide = false
    this.active.blocks.forEach((block) => {
      const {x, y} = block.absPosition();
      const row = this.matrix[(y + offset.y)];
      const col = row ? row[(x + offset.x)] : true;
      if(col) collide = collide || true;
    });
    return collide;
  }

  updateMatrix() {
    this.deactivated.forEach((figure) => {
      figure.blocks.forEach((block) => {
        const {x, y} = block.absPosition();
        this.matrix[y][x] = true;
      });
    });
  }

}