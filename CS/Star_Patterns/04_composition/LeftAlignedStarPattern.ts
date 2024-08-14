import { IStarPattern } from './IStarPattern';
import { Printable } from './Printable';

export class LeftAlignedStarPattern implements IStarPattern {
  private printable: Printable;

  constructor() {
    this.printable = new Printable();
  }

  printPattern(height: number): void {
    for (let i = 1; i <= height; i++) {
      const spaces = ' '.repeat(height - i);
      const stars = '*'.repeat(i);
      this.printable.printLine(stars + spaces);
    }
  }
}
