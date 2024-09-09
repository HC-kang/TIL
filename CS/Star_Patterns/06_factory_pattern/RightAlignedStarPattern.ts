import { IStarPattern } from './IStarPattern';
import { IPrintable } from './IPrintable';
import { IStarFactory } from './IStarFactory';
import { ISpaceFactory } from './ISpaceFactory';

export class RightAlignedStarPattern implements IStarPattern {
  constructor(
    private printable: IPrintable,
    private starFactory: IStarFactory,
    private spaceFactory: ISpaceFactory
  ) {}

  printPattern(height: number): void {
    for (let i = 1; i <= height; i++) {
      const spaces = this.spaceFactory.createSpace(height - i);
      const stars = this.starFactory.createStar(i);
      this.printable.printLine(spaces + stars);
    }
  }
}
