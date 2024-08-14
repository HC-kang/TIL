import { ISpaceFactory } from '../factories/ISpaceFactory';
import { IStarFactory } from '../factories/IStarFactory';
import { Printable } from '../printers/Printable';

export abstract class StarPattern {
  constructor(
    protected printable: Printable,
    protected starFactory: IStarFactory,
    protected spaceFactory: ISpaceFactory
  ) {}

  abstract printPattern(height: number): void;
}
