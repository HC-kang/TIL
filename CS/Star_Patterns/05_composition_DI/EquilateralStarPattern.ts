import { Printable } from './Printable';
import { IStarPattern } from './IStarPattern';

export class EquilateralStarPattern implements IStarPattern {
  constructor(private printable: Printable, private height: number) {}

  printPattern(): void {
    for (let i = 1; i <= this.height; i++) {
      const spaces = ' '.repeat(this.height - i);
      const stars = '*'.repeat(2 * i - 1);
      this.printable.printLine(spaces + stars);
    }
  }
}
