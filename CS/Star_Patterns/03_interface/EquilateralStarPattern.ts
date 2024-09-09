import { IPrintable } from './IPrintable';
import { IStarPattern } from './IStarPattern';

export class EquilateralStarPattern implements IPrintable, IStarPattern {
  printLine(line: string): void {
    console.log(line);
  }

  printPattern(height: number): void {
    for (let i = 1; i <= height; i++) {
      const spaces = ' '.repeat(height - i);
      const stars = '*'.repeat(2 * i - 1);
      this.printLine(spaces + stars);
    }
  }
}
