import { BaseStarPattern } from './BaseStarPattern';

export class RightAlignedStarPattern extends BaseStarPattern {
  printPattern(height: number): void {
    for (let i = 1; i <= height; i++) {
      const spaces = ' '.repeat(height - i);
      const stars = '*'.repeat(i);
      this.printLine(spaces + stars);
    }
  }
}
