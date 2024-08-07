export abstract class BaseStarPattern {
  constructor(protected height: number) {}

  abstract printPattern(): void;

  protected printLine(line: string): void {
    console.log(line);
  }
}
