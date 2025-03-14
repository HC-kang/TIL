import { Printable } from './Printable';
import { IStarPattern } from './IStarPattern';

export class EquilateralStarPattern implements IStarPattern {
  private printable: Printable;

  constructor() {
    this.printable = new Printable();
  }

  printPattern(height: number): void {
    for (let i = 1; i <= height; i++) {
      const spaces = ' '.repeat(height - i);
      const stars = '*'.repeat(2 * i - 1);
      this.printable.printLine(spaces + stars);
    }
  }
}
