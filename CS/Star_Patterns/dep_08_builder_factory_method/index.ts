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
    constructor(
      private starFactory: StarFactory,
      private spaceFactory: SpaceFactory
    ) {}

    printPattern(n: number): void {
      for (let i = 1; i <= n; i++) {
        const spaces = this.spaceFactory.createSpace(n - i);
        const stars = this.starFactory.createStar(i);
        console.log(spaces + stars);
      }
    }
  }

  class LeftAlignedStarPattern implements StarPattern {
    constructor(
      private starFactory: StarFactory,
      private spaceFactory: SpaceFactory
    ) {}

    printPattern(n: number): void {
      for (let i = 1; i <= n; i++) {
        const spaces = this.spaceFactory.createSpace(n - i);
        const stars = this.starFactory.createStar(i);
        console.log(stars + spaces);
      }
    }
  }

  class EquilateralStarPattern implements StarPattern {
    constructor(
      private starFactory: StarFactory,
      private spaceFactory: SpaceFactory
    ) {}

    printPattern(n: number): void {
      for (let i = 1; i <= n; i++) {
        const spaces = this.spaceFactory.createSpace(n - i);
        const stars = this.starFactory.createStar(2 * i - 1);
        console.log(spaces + stars + spaces);
      }
    }
  }

  class PatternPrinter implements Subject {
    private pattern: StarPattern | null = null;
    private observers: Observer[] = [];

    print(n: number): void {
      this.notifyObservers('beforePrint');
      if (this.pattern === null) {
        throw new Error('Pattern must be set before printing');
      }
      this.pattern.printPattern(n);
      this.notifyObservers('afterPrint');
    }

    setPattern(pattern: StarPattern): void {
      this.pattern = pattern;
    }

    addObserver(observer: Observer): void {
      this.observers.push(observer);
    }

    removeObserver(observer: Observer): void {
      this.observers = this.observers.filter((obs) => obs !== observer);
    }

    notifyObservers(event: string): void {
      this.observers.forEach((observer) => observer.update(event));
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

  interface Observer {
    update(event: string): void;
  }

  class PatternObserver implements Observer {
    update(event: string): void {
      console.log(`Event: ${event}`);
    }
  }

  interface Subject {
    addObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    notifyObservers(event: string): void;
  }

  class PatternPrinterBuilder {
    private patternFactory: StarPatternFactory | null = null;
    private starFactory: StarFactory;
    private spaceFactory: SpaceFactory;
    private observers: Observer[] = [];

    constructor() {
      this.starFactory = SimpleStarFactory.getInstance();
      this.spaceFactory = SimpleSpaceFactory.getInstance();
    }

    addObserver(observer: Observer): PatternPrinterBuilder {
      this.observers.push(observer);
      return this;
    }

    setPatternFactory(
      patternFactory: StarPatternFactory
    ): PatternPrinterBuilder {
      this.patternFactory = patternFactory;
      return this;
    }

    build(): PatternPrinter {
      if (this.patternFactory === null) {
        throw new Error('Pattern factory must be set before building');
      }

      const pattern = this.patternFactory.createPattern(
        this.starFactory,
        this.spaceFactory
      );
      const decoratedPattern = new PatternDecorator(pattern);
      const printer = new PatternPrinter();
      printer.setPattern(decoratedPattern);
      this.observers.forEach((observer) => printer.addObserver(observer));
      return printer;
    }
  }

  interface StarPatternFactory {
    createPattern(
      starFactory: StarFactory,
      spaceFactory: SpaceFactory
    ): StarPattern;
  }

  class RightAlignedStarPatternFactory implements StarPatternFactory {
    createPattern(
      starFactory: StarFactory,
      spaceFactory: SpaceFactory
    ): StarPattern {
      return new RightAlignedStarPattern(starFactory, spaceFactory);
    }
  }

  class LeftAlignedStarPatternFactory implements StarPatternFactory {
    createPattern(
      starFactory: StarFactory,
      spaceFactory: SpaceFactory
    ): StarPattern {
      return new LeftAlignedStarPattern(starFactory, spaceFactory);
    }
  }

  class EquilateralStarPatternFactory implements StarPatternFactory {
    createPattern(
      starFactory: StarFactory,
      spaceFactory: SpaceFactory
    ): StarPattern {
      return new EquilateralStarPattern(starFactory, spaceFactory);
    }
  }

  const rightPatternPrinter = new PatternPrinterBuilder()
    .setPatternFactory(new RightAlignedStarPatternFactory())
    .addObserver(new PatternObserver())
    .build();
  rightPatternPrinter.print(5);

  console.log();

  const leftPatternPrinter = new PatternPrinterBuilder()
    .setPatternFactory(new LeftAlignedStarPatternFactory())
    .addObserver(new PatternObserver())
    .build();
  leftPatternPrinter.print(5);

  console.log();

  const equilateralPatternPrinter = new PatternPrinterBuilder()
    .setPatternFactory(new EquilateralStarPatternFactory())
    .addObserver(new PatternObserver())
    .build();
  equilateralPatternPrinter.print(5);
}
