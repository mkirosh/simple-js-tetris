import Coordenate from './coordenate.js';
import Frame from './frame.js';


const changeDirection = function(step = 1) {
  if  (this.alive) {
    if(step >= 0) {
      this.direction < 3 ? this.direction++ : this.direction = 0;
    } else {
      this.direction > 0 ? this.direction-- : this.direction = 3;
    }
  }
}

const stepHorizontal = function(step = 1) {
  if  (this.alive) {
    if(step >= 0) {
      this.position.x++;
    } else {
      this.position.x--;
    }
  }
}

const drop = function(step = 1) {
  if (this.alive) {
    this.position.y += step;
  }
}

export default class FigureFrame extends Frame {
  constructor(position, direction) {
    super(position, direction);
    this.blocks = [];
    this.alive = true;
    this.relBounds = _.memoize(this.relBounds.bind(this), () => this.direction);
  }

  rotateRight() {
    changeDirection.call(this);
  }

  rotateLeft() {
    changeDirection.call(this, -1);
  }

  moveRight() {
    stepHorizontal.call(this);
  }

  moveLeft() {
    stepHorizontal.call(this, -1);
  }

  drop() {
    drop.call(this);
  }
  
  relBounds() {
    const upper = new Coordenate(0, 0);
    const lower = new Coordenate(0, 0);
    this.blocks.map((blk) => {
      const pos = blk.relPosition();
      if(upper.x < pos.x) upper.x = pos.x;
      if(upper.y < pos.y) upper.y = pos.y;
      if(lower.x > pos.x) lower.x = pos.x;
      if(lower.y > pos.y) lower.y = pos.y;
    });
    return { upper, lower }
  }

  absBounds() {
    const { upper, lower } = this.relBounds();
    return {
      upper: new Coordenate(this.position.x + upper.x, this.position.y + upper.y),
      lower: new Coordenate(this.position.x + lower.x, this.position.y + lower.y),
    }
  }

  addBlocks(blocks) {
    this.blocks = this.blocks.concat(blocks);
  }

  deactivate() {
    this.alive = false;
  }
}