const directions = ['N', 'E', 'S', 'W'];

export class Direction {
  private position = 0;

  toString(): string {
    return directions[this.position];
  }
  rotateRight(): void {
    this.position += 1;
    if (this.position > 3) this.position = 0;
  }
  rotateLeft(): void {
    this.position -= 1;
    if (this.position < 0) this.position = 3;
  }
}
