import { BaseStarPattern } from './BaseStarPattern';

export class LeftAlignedStarPattern extends BaseStarPattern {
  printPattern(): void {
    for (let i = 1; i <= this.height; i++) {
      const spaces = ' '.repeat(this.height - i);
      const stars = '*'.repeat(i);
      this.printLine(stars + spaces);
    }
  }
}
