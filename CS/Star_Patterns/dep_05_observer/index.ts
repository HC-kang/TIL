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
    private observers: Observer[] = [];

    constructor(public pattern: StarPattern) {}

    print(n: number): void {
      this.notifyObservers('beforePrint');
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

  const simpleStarFactory = SimpleStarFactory.getInstance();
  const simpleSpaceFactory = SimpleSpaceFactory.getInstance();

  const rightAlignedPattern = new RightAlignedStarPattern(
    simpleStarFactory,
    simpleSpaceFactory
  );
  const leftAlignedPattern = new LeftAlignedStarPattern(
    simpleStarFactory,
    simpleSpaceFactory
  );
  const equilateralPattern = new EquilateralStarPattern(
    simpleStarFactory,
    simpleSpaceFactory
  );

  const observer = new PatternObserver();

  const patternPrinter = new PatternPrinter(
    new PatternDecorator(rightAlignedPattern)
  );
  patternPrinter.addObserver(observer);
  patternPrinter.print(5);

  const patternPrinter2 = new PatternPrinter(
    new PatternDecorator(leftAlignedPattern)
  );
  patternPrinter2.addObserver(observer);
  patternPrinter2.print(5);

  const patternPrinter3 = new PatternPrinter(
    new PatternDecorator(equilateralPattern)
  );
  patternPrinter3.addObserver(observer);
  patternPrinter3.print(5);
}
