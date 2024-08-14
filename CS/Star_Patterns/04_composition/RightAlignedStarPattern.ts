import { IStarPattern } from './IStarPattern';
import { Printable } from './Printable';

export class RightAlignedStarPattern implements IStarPattern {
  private printable: Printable;

  constructor(private height: number) {
    this.printable = new Printable();
  }

  printPattern(): void {
    for (let i = 1; i <= this.height; i++) {
      const spaces = ' '.repeat(this.height - i);
      const stars = '*'.repeat(i);
      this.printable.printLine(spaces + stars);
    }
  }
}
