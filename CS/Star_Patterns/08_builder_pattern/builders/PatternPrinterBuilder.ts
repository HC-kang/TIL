import { PrintPatternCommand } from '../commands/PrintPatternCommand';
import { ISpaceFactory } from '../factories/ISpaceFactory';
import { IStarFactory } from '../factories/IStarFactory';
import { StarPattern } from '../patterns/StarPattern';
import { PatternPrinter } from '../printers/PatternPrinter';
import { Printable } from '../printers/Printable';

export class PatternPrinterBuilder {
  private printable: Printable;
  private starFactory: IStarFactory | null = null;
  private spaceFactory: ISpaceFactory | null = null;
  private patternClass: (new (...args: any[]) => StarPattern) | null = null;
  private height: number | null = null;

  constructor() {
    this.printable = new Printable();
  }

  setStarFactory(starFactory: IStarFactory): PatternPrinterBuilder {
    this.starFactory = starFactory;
    return this;
  }

  setSpaceFactory(spaceFactory: ISpaceFactory): PatternPrinterBuilder {
    this.spaceFactory = spaceFactory;
    return this;
  }

  setPatternType(
    patternClass: new (...args: any[]) => StarPattern
  ): PatternPrinterBuilder {
    this.patternClass = patternClass;
    return this;
  }

  setHeight(height: number): PatternPrinterBuilder {
    this.height = height;
    return this;
  }

  build(): PatternPrinter {
    if (!this.starFactory) throw new Error('Star factory is required');
    if (!this.spaceFactory) throw new Error('Space factory is required');
    if (!this.patternClass) throw new Error('Pattern type is required');
    if (!this.height) throw new Error('Height is required');

    // 패턴 인스턴스를 빌더 내부에서 생성
    const pattern = new this.patternClass(
      this.printable,
      this.starFactory,
      this.spaceFactory,
    );
    const command = new PrintPatternCommand(pattern, this.height);
    const patternPrinter = new PatternPrinter(command);

    return patternPrinter;
  }
}
