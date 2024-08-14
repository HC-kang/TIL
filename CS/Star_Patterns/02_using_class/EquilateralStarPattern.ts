import { BaseStarPattern } from './BaseStarPattern';

export class EquilateralStarPattern extends BaseStarPattern {
  printPattern(height: number): void {
    for (let i = 1; i <= height; i++) {
      const spaces = ' '.repeat(height - i);
      const stars = '*'.repeat(2 * i - 1);
      this.printLine(spaces + stars);
    }
  }
}
