import { IStarPattern } from './IStarPattern';
import { Printable } from './Printable';

export class LeftAlignedStarPattern implements IStarPattern {
  constructor(private printable: Printable, private height: number) {}

  printPattern(): void {
    for (let i = 1; i <= this.height; i++) {
      const spaces = ' '.repeat(this.height - i);
      const stars = '*'.repeat(i);
      this.printable.printLine(stars + spaces);
    }
  }
}
