import GameFrame from './game_frame.js';
import { bg, board } from './settings.json';
const [width, height] = board;

const setFrameRate = function(fr) {
  this.tick = _.throttle(this._tick.bind(this), fr);
}

export default class Game {
    constructor(ctx) {
      this.ctx = ctx;
      this.gameFrame = new GameFrame(ctx, width, height);
      this.keyPressed = _.throttle(this.keyPressed.bind(this), 100);
      this.keyReleased = _.throttle(this.keyReleased.bind(this), 100);
      setFrameRate.call(this, 300);
      this.draw = this.draw.bind(this);
      this.loop = true;
    }
  
    draw() {
      this.ctx.background(bg);
      this.tick();
      this.gameFrame.draw();
    }

    _tick() {
      this.gameFrame.tick();
    }

    setFrameRate(fr) {
      this.tick = _.throttle(this._tick.bind(this), fr);
    }

    pause() {
      if(this.loop) {
        this.ctx.noLoop();
        this.loop = false;
      } else {
        this.ctx.loop();
        this.loop = true;
      }
    }

    keyReleased(e) {
      console.log('asdf');
      switch (e.key) {
        case "s":
          setFrameRate.call(this, 300);
          break;
      }
    }
  
    keyPressed(e) {
      switch (e.key) {
        case "a": 
          this.gameFrame.active.frame.rotateRight();
          break;
        case "d": 
          this.gameFrame.active.frame.rotateLeft();
          break;
        case "s":
          setFrameRate.call(this, 50);
          break;
        case "ArrowRight":
          this.gameFrame.assertHorizontalStep(1, 1);
          break;
        case "ArrowLeft": 
          this.gameFrame.assertHorizontalStep(-1);
          break;
        case "Enter":
          this.pause();

      }
    }
  }