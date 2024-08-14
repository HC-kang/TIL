import { IStarPattern } from './IStarPattern';
import { Printable } from './Printable';
import { IStarFactory } from './IStarFactory';
import { ISpaceFactory } from './ISpaceFactory';

export class RightAlignedStarPattern implements IStarPattern {
  constructor(
    private printable: Printable,
    private starFactory: IStarFactory,
    private spaceFactory: ISpaceFactory,
    private height: number
  ) {}

  printPattern(): void {
    for (let i = 1; i <= this.height; i++) {
      const spaces = this.spaceFactory.createSpace(this.height - i);
      const stars = this.starFactory.createStar(i);
      this.printable.printLine(spaces + stars);
    }
  }
}
