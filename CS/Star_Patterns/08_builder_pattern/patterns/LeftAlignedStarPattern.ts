import { ISpaceFactory } from '../factories/ISpaceFactory';
import { IStarFactory } from '../factories/IStarFactory';
import { IPrintable } from '../printers/IPrintable';
import { StarPattern } from './StarPattern';

export class LeftAlignedStarPattern extends StarPattern {
  constructor(
    protected printable: IPrintable,
    protected starFactory: IStarFactory,
    protected spaceFactory: ISpaceFactory
  ) {
    super(printable, starFactory, spaceFactory);
  }

  printPattern(height: number): void {
    for (let i = 1; i <= height; i++) {
      const spaces = this.spaceFactory.createSpace(height - i);
      const stars = this.starFactory.createStar(i);
      this.printable.printLine(stars + spaces);
    }
  }
}
