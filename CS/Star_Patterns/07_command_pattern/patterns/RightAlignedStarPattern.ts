import { StarPattern } from './StarPattern';
import { Printable } from '../printers/Printable';
import { IStarFactory } from '../factories/IStarFactory';
import { ISpaceFactory } from '../factories/ISpaceFactory';

export class RightAlignedStarPattern extends StarPattern {
  constructor(
    protected printable: Printable,
    protected starFactory: IStarFactory,
    protected spaceFactory: ISpaceFactory
  ) {
    super(printable, starFactory, spaceFactory);
  }

  printPattern(height: number): void {
    for (let i = 1; i <= height; i++) {
      const spaces = this.spaceFactory.createSpace(height - i);
      const stars = this.starFactory.createStar(i);
      this.printable.printLine(spaces + stars);
    }
  }
}
