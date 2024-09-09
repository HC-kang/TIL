import { IStarFactory } from '../../06_factory_pattern/IStarFactory';
import { Printable } from '../../06_factory_pattern/Printable';
import { ISpaceFactory } from '../factories/ISpaceFactory';

export abstract class StarPattern {
  constructor(
    protected printable: Printable,
    protected starFactory: IStarFactory,
    protected spaceFactory: ISpaceFactory
  ) {}

  abstract printPattern(height: number): void;
}
