import { Printable } from './Printable';
import { IStarPattern } from './IStarPattern';
import { ISpaceFactory } from './ISpaceFactory';
import { IStarFactory } from './IStarFactory';

export class EquilateralStarPattern implements IStarPattern {
  constructor(
    private printable: Printable,
    private starFactory: IStarFactory,
    private spaceFactory: ISpaceFactory,
    private height: number
  ) {}

  printPattern(): void {
    for (let i = 1; i <= this.height; i++) {
      const spaces = this.spaceFactory.createSpace(this.height - i);
      const stars = this.starFactory.createStar(2 * i - 1);
      this.printable.printLine(spaces + stars);
    }
  }
}
