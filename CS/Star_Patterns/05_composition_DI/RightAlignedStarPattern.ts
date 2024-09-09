import { IStarPattern } from './IStarPattern';
import { Printable } from './Printable';

export class RightAlignedStarPattern implements IStarPattern {
  constructor(private printable: Printable) {}

  printPattern(height: number): void {
    for (let i = 1; i <= height; i++) {
      const spaces = ' '.repeat(height - i);
      const stars = '*'.repeat(i);
      this.printable.printLine(spaces + stars);
    }
  }
}
