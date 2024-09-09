import { StarPattern } from '../patterns/StarPattern';
import { ICommand } from './ICommand';

export class PrintPatternCommand implements ICommand {
  constructor(private pattern: StarPattern, private height: number) {}

  execute(): void {
    this.pattern.printPattern(this.height);
  }
}
