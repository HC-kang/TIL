{
  interface StarFactory {
    createStar(count: number): string;
  }

  interface SpaceFactory {
    createSpace(count: number): string;
  }

  class SimpleStarFactory implements StarFactory {
    private static instance: SimpleStarFactory;

    static getInstance(): SimpleStarFactory {
      if (!SimpleStarFactory.instance) {
        SimpleStarFactory.instance = new SimpleStarFactory();
      }
      return SimpleStarFactory.instance;
    }

    createStar(count: number): string {
      return '*'.repeat(count);
    }
  }

  class SimpleSpaceFactory implements SpaceFactory {
    private static instance: SimpleSpaceFactory;

    static getInstance(): SimpleSpaceFactory {
      if (!SimpleSpaceFactory.instance) {
        SimpleSpaceFactory.instance = new SimpleSpaceFactory();
      }
      return SimpleSpaceFactory.instance;
    }

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

  class PatternPrinter {
    constructor(public pattern: StarPattern) {}

    print(n: number): void {
      this.pattern.printPattern(n);
    }
  }

  class PatternDecorator implements StarPattern {
    constructor(private pattern: StarPattern) {}

    printPattern(n: number): void {
      this.beforePrint();
      this.pattern.printPattern(n);
      this.afterPrint();
    }

    protected beforePrint(): void {
      console.log('Before print');
    }

    protected afterPrint(): void {
      console.log('After print');
    }
  }

  const simpleStarFactory = SimpleStarFactory.getInstance();
  const simpleSpaceFactory = SimpleSpaceFactory.getInstance();

  const rightAlignedPattern = new RightAlignedStarPattern(simpleStarFactory, simpleSpaceFactory);
  const leftAlignedPattern = new LeftAlignedStarPattern(simpleStarFactory, simpleSpaceFactory);
  const equilateralPattern = new EquilateralStarPattern(simpleStarFactory, simpleSpaceFactory);

  const patternPrinter = new PatternPrinter(new PatternDecorator(rightAlignedPattern));
  patternPrinter.print(5);

  const patternPrinter2 = new PatternPrinter(new PatternDecorator(leftAlignedPattern));
  patternPrinter2.print(5);

  const patternPrinter3 = new PatternPrinter(new PatternDecorator(equilateralPattern));
  patternPrinter3.print(5);
}