{
  interface StarFactory {
    createStar(count: number): string;
  }

  interface SpaceFactory {
    createSpace(count: number): string;
  }

  class SimpleStarFactory implements StarFactory {
    createStar(count: number): string {
      return '*'.repeat(count);
    }
  }

  class SimpleSpaceFactory implements SpaceFactory {
    createSpace(count: number): string {
      return ' '.repeat(count);
    }
  }

  interface StarPattern {
    printPattern(n: number): void;
  }

  class RightAlignedStarPattern implements StarPattern {
    constructor(private starFactory: StarFactory, private spaceFactory: SpaceFactory) {}

    printPattern(n: number): void {
      for (let i = 1; i <= n; i++) {
        const spaces = this.spaceFactory.createSpace(n - i);
        const stars = this.starFactory.createStar(i);
        console.log(spaces + stars);
      }
    }
  }

  class LeftAlignedStarPattern implements StarPattern {
    constructor(private starFactory: StarFactory, private spaceFactory: SpaceFactory) {}

    printPattern(n: number): void {
      for (let i = 1; i <= n; i++) {
        const spaces = this.spaceFactory.createSpace(n - i);
        const stars = this.starFactory.createStar(i);
        console.log(stars + spaces);
      }
    }
  }

  class EquilateralStarPattern implements StarPattern {
    constructor(private starFactory: StarFactory, private spaceFactory: SpaceFactory) {}

    printPattern(n: number): void {
      for (let i = 1; i <= n; i++) {
        const spaces = this.spaceFactory.createSpace(n - i);
        const stars = this.starFactory.createStar(2 * i - 1);
        console.log(spaces + stars + spaces);
      }
    }
  }

  // class PatternPrinter {
  //   constructor(public pattern: StarPattern) {}

  //   print(n: number): void {
  //     this.pattern.printPattern(n);
  //   }
  // }

  const simpleStarFactory = new SimpleStarFactory();
  const simpleSpaceFactory = new SimpleSpaceFactory();

  const rightAlignedPattern = new RightAlignedStarPattern(simpleStarFactory, simpleSpaceFactory);
  const leftAlignedPattern = new LeftAlignedStarPattern(simpleStarFactory, simpleSpaceFactory);
  const equilateralPattern = new EquilateralStarPattern(simpleStarFactory, simpleSpaceFactory);

  rightAlignedPattern.printPattern(5);
  leftAlignedPattern.printPattern(5);
  equilateralPattern.printPattern(5);
  // const patternPrinter = new PatternPrinter(rightAlignedPattern);
  // patternPrinter.print(5);

  // patternPrinter.pattern = leftAlignedPattern;
  // patternPrinter.print(5);

  // patternPrinter.pattern = equilateralPattern;
  // patternPrinter.print(5);
}