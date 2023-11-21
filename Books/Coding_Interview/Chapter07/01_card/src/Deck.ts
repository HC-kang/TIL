import { Card } from './Card';

export class Deck {
  private cards: Card[] = [];
  private dealtIndex = 0;

  setDeckOfCards(deckOfCards: Card[]) {
    this.cards = deckOfCards;
  }

  shuffle() {
    let currentIndex = this.cards.length;
    let randomIndex: number;
    const newCards = Array.from(this.cards);

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [newCards[currentIndex], newCards[randomIndex]] = [
        newCards[randomIndex],
        newCards[currentIndex],
      ];
    }
    this.cards = newCards;
    this.dealtIndex = 0;
  }

  remainingCards(): number {
    return this.cards.length - this.dealtIndex;
  }

  dealHand(number: number): Card[] {
    const cards = this.cards.slice(this.dealtIndex, this.dealtIndex + number);
    this.dealtIndex += number;
    return cards;
  }

  dealCard(): Card {
    return this.cards[this.dealtIndex++];
  }
}
