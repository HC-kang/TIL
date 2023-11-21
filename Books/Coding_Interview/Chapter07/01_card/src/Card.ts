import { Suit } from './Suit';

export class Card {
  private available = true;
  protected faceValue: number;
  protected suit: Suit;

  constructor(faceValue: number, suit: Suit) {
    this.faceValue = faceValue;
    this.suit = suit;
  }

  value(): number {
    return this.faceValue;
  }

  getSuit(): Suit {
    return this.suit;
  }

  isAvailable(): boolean {
    return this.available;
  }

  markUnavailable(): void {
    this.available = false;
  }

  markAvailable(): void {
    this.available = true;
  }
}
