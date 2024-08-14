import { ISpaceFactory } from '../07_command_pattern/factories/ISpaceFactory';
import { IStarFactory } from '../07_command_pattern/factories/IStarFactory';
import { Printable } from '../07_command_pattern/printers/Printable';

export abstract class StarPattern {
  constructor(
    protected printable: Printable,
    protected starFactory: IStarFactory,
    protected spaceFactory: ISpaceFactory
  ) {}

  abstract printPattern(height: number): void;
}
