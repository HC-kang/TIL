import { IPrintable } from './IPrintable';

export class Printable implements IPrintable {
  printLine(line: string): void {
    console.log(line);
  }
}
