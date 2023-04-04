export class Point {
  y: number;
  x: number;

  constructor(y: number, x: number) {
    this.y = y;
    this.x = x;
  }

  toString(): string {
    return `${this.y},${this.x}`;
  }
}
