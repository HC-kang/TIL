import { IPrintable } from './IPrintable';
import { IStarPattern } from './IStarPattern';

export class LeftAlignedStarPattern implements IPrintable, IStarPattern {
  printLine(line: string): void {
    console.log(line);
  }

  printPattern(height: number): void {
    for (let i = 1; i <= height; i++) {
      const spaces = ' '.repeat(height - i);
      const stars = '*'.repeat(i);
      this.printLine(stars + spaces);
    }
  }
}
