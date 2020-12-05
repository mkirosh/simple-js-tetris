import Game from './game.js';
import { board, unit, bg } from './settings.json';

const s = ( p ) => {
  const [ width, height ] = board;
  const game = new Game(p);

  p.setup = function() {
    p.frameRate(60);
    p.createCanvas(width * unit, height * unit);
    p.strokeWeight(4);
    p.stroke(bg);
  };

  p.draw = game.draw
  p.keyReleased = game.keyReleased
  p.keyPressed = game.keyPressed

};

let myp5 = new p5(s);