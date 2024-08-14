export abstract class BaseStarPattern {
  abstract printPattern(height: number): void;

  protected printLine(line: string): void {
    console.log(line);
  }
}
