import { Rover } from '../src/Rover';
import { Map } from '../src/Map';
import { Point } from '../src/Point';

describe('Mars Rover Tests', () => {
  it('should rotate right 360 degrees', () => {
    const map = new Map();
    const rover = new Rover(map);
    expect(rover.execute('RRRR')).toBe('0,0:N');
  });
  it('should move south two positions', () => {
    const map = new Map();
    const rover = new Rover(map);
    expect(rover.execute('MMMRRMM')).toBe('1,0:S');
  });
  it('should wrap the map when going south', () => {
    const map = new Map();
    const rover = new Rover(map);
    expect(rover.execute('RRM')).toBe('9,0:S');
  });
  it('should wrap the map when going east', () => {
    const map = new Map();
    const rover = new Rover(map);
    expect(rover.execute('RMMMMMMMMMM')).toBe('0,0:E');
  });
  it('should wrap the map when going west', () => {
    const map = new Map();
    const rover = new Rover(map);
    expect(rover.execute('LMM')).toBe('0,8:W');
  });
  it('should detect and inform an obstacle', () => {
    const obstacle = new Point(1, 0);
    const map = new Map([obstacle]);
    const rover = new Rover(map);
    expect(rover.execute('M')).toBe('0,0:N,Obstacle!');
  });
});
