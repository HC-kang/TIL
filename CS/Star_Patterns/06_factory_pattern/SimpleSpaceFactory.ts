import { ISpaceFactory } from './ISpaceFactory';

export class SimpleSpaceFactory implements ISpaceFactory {
  createSpace(count: number): string {
    return ' '.repeat(count);
  }
}
