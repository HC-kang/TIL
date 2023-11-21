import { Card } from './Card';
import { Suit } from './Suit';

export class BlackJackCard extends Card {
  constructor(faceValue: number, suit: Suit) {
    super(faceValue, suit);
  }

  value(): number {
    if (this.isAce()) return 1;
    else if (this.faceValue >= 11 && this.faceValue <= 13) return 10;
    else return this.faceValue;
  }

  minValue(): number {
    if (this.isAce()) return 1;
    else return this.value();
  }

  maxValue(): number {
    if (this.isAce()) return 11;
    else return this.value();
  }

  isAce(): boolean {
    return this.faceValue === 1;
  }

  isFaceCard(): boolean {
    return this.faceValue >= 11 && this.faceValue <= 13;
  }
}
