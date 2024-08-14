import { ICommand } from '../commands/ICommand';

export class PatternPrinter {
  constructor(private command: ICommand) {}

  setCommand(command: ICommand): void {
    this.command = command;
  }

  print(): void {
    this.command.execute();
  }
}
