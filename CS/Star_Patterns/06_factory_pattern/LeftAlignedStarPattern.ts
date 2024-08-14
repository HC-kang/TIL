import { IStarPattern } from './IStarPattern';
import { Printable } from './Printable';
import { IStarFactory } from './IStarFactory';
import { ISpaceFactory } from './ISpaceFactory';

export class LeftAlignedStarPattern implements IStarPattern {
  constructor(
    private printable: Printable,
    private starFactory: IStarFactory,
    private spaceFactory: ISpaceFactory
  ) {}

  printPattern(height: number): void {
    for (let i = 1; i <= height; i++) {
      const spaces = this.spaceFactory.createSpace(height - i);
      const stars = this.starFactory.createStar(i);
      this.printable.printLine(stars + spaces);
    }
  }
}
