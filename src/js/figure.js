import FigureFrame from './figure_frame.js';
import Block from './block.js';
import Coordenate from './coordenate.js';
import { colors, figures, unit, board } from './settings.json';

const initBlocks = (coords, frame) => {
  return coords.map((coord) => {
    const [x, y] = coord;
    const position = new Coordenate(x, y);
    return new Block(frame, position);
  });
};

const initColor = () => {
  return colors[_.random(0, colors.length - 1)];
};

const initDirection = () => {
  return _.random(0, 3);
}

const initPosition = () => {
  const [ width ] = board;
  return new Coordenate(Math.ceil(width / 2), 0);
};

const initFigure = () => {
  return figures[_.random(0, figures.length - 1)];
}

const initFrame = function() {
  const figure = initFigure();
  this.frame = new FigureFrame(initPosition(), initDirection());
  this.blocks = initBlocks(figure.coords, this.frame);
  this.rotation = figure.rotation;
  this.frame.addBlocks(this.blocks);
}

export default class Figure {
  constructor(ctx) {
    this.ctx = ctx;
    this.color = initColor();
    initFrame.call(this);
  }

  draw() {
    this.ctx.fill(this.color);
    // this.ctx.push();
    // this.ctx.fill('black');
    // const frPos = this.frame.position.inUnits();
    // this.ctx.square(frPos.x, frPos.y, unit * 200);
    // this.ctx.pop();
    this.blocks.map((blk) => {
      const pos = blk.absPosition().inUnits();
      this.ctx.square(pos.x, pos.y, unit);
    });
  }
}
