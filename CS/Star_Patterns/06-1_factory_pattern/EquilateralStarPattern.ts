import { Printable } from './Printable';
import { StarPattern } from './StarPattern';
import { ISpaceFactory } from './ISpaceFactory';
import { IStarFactory } from './IStarFactory';

export class EquilateralStarPattern extends StarPattern {
  constructor(
    protected printable: Printable,
    protected starFactory: IStarFactory,
    protected spaceFactory: ISpaceFactory,
  ) {
    super(printable, starFactory, spaceFactory);
  }

  printPattern(height: number): void {
    for (let i = 1; i <= height; i++) {
      const spaces = this.spaceFactory.createSpace(height - i);
      const stars = this.starFactory.createStar(2 * i - 1);
      this.printable.printLine(spaces + stars);
    }
  }
}
