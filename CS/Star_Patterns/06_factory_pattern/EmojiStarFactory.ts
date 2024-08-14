import { IStarFactory } from './IStarFactory';

export class EmojiStarFactory implements IStarFactory {
  createStar(count: number): string {
    return '🌟'.repeat(count);
  }
}
