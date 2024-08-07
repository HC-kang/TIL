import { BaseStarPattern } from './BaseStarPattern';

export class RightAlignedStarPattern extends BaseStarPattern {
  printPattern(): void {
    for (let i = 1; i <= this.height; i++) {
      const spaces = ' '.repeat(this.height - i);
      const stars = '*'.repeat(i);
      this.printLine(spaces + stars);
    }
  }
}
