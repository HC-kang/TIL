import { IPrintable } from './IPrintable';
import { IStarPattern } from './IStarPattern';

export class EquilateralStarPattern implements IPrintable, IStarPattern {
  constructor(private height: number) {}

  printLine(line: string): void {
    console.log(line);
  }

  printPattern(): void {
    for (let i = 1; i <= this.height; i++) {
      const spaces = ' '.repeat(this.height - i);
      const stars = '*'.repeat(2 * i - 1);
      this.printLine(spaces + stars);
    }
  }
}
