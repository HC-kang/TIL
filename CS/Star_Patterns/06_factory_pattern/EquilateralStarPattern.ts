import { IPrintable } from './IPrintable';
import { IStarPattern } from './IStarPattern';
import { ISpaceFactory } from './ISpaceFactory';
import { IStarFactory } from './IStarFactory';

export class EquilateralStarPattern implements IStarPattern {
  constructor(
    private printable: IPrintable,
    private starFactory: IStarFactory,
    private spaceFactory: ISpaceFactory
  ) {}

  printPattern(height: number): void {
    for (let i = 1; i <= height; i++) {
      const spaces = this.spaceFactory.createSpace(height - i);
      const stars = this.starFactory.createStar(2 * i - 1);
      this.printable.printLine(spaces + stars);
    }
  }
}
