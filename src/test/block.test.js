import Block from '../js/block.js';
import Frame from '../js/frame.js';
import Coordenate from '../js/coordenate.js';



describe('when initializing', () => {
  const coord = new Coordenate(1,1);
  const frame = new Frame(coord, 0);

  describe('with no frame', () => {
    test('throws error', () => {
      expect(() => new Block(null, null)).toThrow("expected frame to be Frame")
    });
  });

  describe('with no position', () => {
    test('throws error', () => {
      expect(() => new Block(frame, null)).toThrow("expected position to be Coordenate")
    });
  });

  describe('with complete params', () => {
    test('returns instance', () => {
      const instance = new Block(frame, coord);
      expect(instance).toBeTruthy();
    });
  });
});

describe('.relPosition', () => {

  const buildMocked = (direction = 0) => {
    const coord = new Coordenate(1,2);
    const frame = new Frame(coord, direction);
    return new Block(frame, coord)
  }
 
  describe('when original position', () => {
    test('returns correct position', () => {
      const position = buildMocked(0).relPosition();
      expect(position.x).toBe(1)
      expect(position.y).toBe(2)
    });
  });

  describe('when rotated once', () => {
    test('returns correct position', () => {
      const position = buildMocked(1).relPosition();
      expect(position.x).toBe(2);
      expect(position.y).toBe(-1);
    })
  });


  describe('when rotated twice', () => {
    test('returns correct position', () => {
      const position = buildMocked(2).relPosition();
      expect(position.x).toBe(-1);
      expect(position.y).toBe(-2);
    })
  });

  describe('when rotated thrice', () => {
    test('returns correct position', () => {
      const position = buildMocked(3).relPosition();
      expect(position.x).toBe(-2);
      expect(position.y).toBe(1);
    })
  });


});