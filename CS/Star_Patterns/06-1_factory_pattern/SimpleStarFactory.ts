import { IStarFactory } from './IStarFactory';

export class SimpleStarFactory implements IStarFactory {
  createStar(count: number): string {
    return '*'.repeat(count);
  }
}
