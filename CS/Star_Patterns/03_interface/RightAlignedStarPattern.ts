import { IPrintable } from './IPrintable';
import { IStarPattern } from './IStarPattern';

export class RightAlignedStarPattern implements IPrintable, IStarPattern {
  constructor(private height: number) {}

  printLine(line: string): void {
    console.log(line);
  }

  printPattern(): void {
    for (let i = 1; i <= this.height; i++) {
      const spaces = ' '.repeat(this.height - i);
      const stars = '*'.repeat(i);
      this.printLine(spaces + stars);
    }
  }
}