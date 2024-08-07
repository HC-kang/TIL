{
  abstract class BaseStarPattern {
    constructor(protected n: number) {}

    abstract printPattern(): void;

    protected printLine(line: string): void {
      console.log(line);
    }
  }

  class RightAlignedStarPattern extends BaseStarPattern {
    printPattern(): void {
      for (let i = 1; i <= this.n; i++) {
        const spaces = ' '.repeat(this.n - i);
        const stars = '*'.repeat(i);
        this.printLine(spaces + stars);
      }
    }
  }

  class LeftAlignedStarPattern extends BaseStarPattern {
    printPattern(): void {
      for (let i = 1; i <= this.n; i++) {
        const spaces = ' '.repeat(this.n - i);
        const stars = '*'.repeat(i);
        this.printLine(stars + spaces);
      }
    }
  }

  class EquilateralStarPattern extends BaseStarPattern {
    printPattern(): void {
      for (let i = 1; i <= this.n; i++) {
        const spaces = ' '.repeat(this.n - i);
        const stars = '*'.repeat(2 * i - 1);
        this.printLine(spaces + stars + spaces);
      }
    }
  }
  
  const rightAlignedPattern = new RightAlignedStarPattern(5);
  rightAlignedPattern.printPattern();

  const leftAlignedPattern = new LeftAlignedStarPattern(5);
  leftAlignedPattern.printPattern();

  const equilateralPattern = new EquilateralStarPattern(5);
  equilateralPattern.printPattern();
}
