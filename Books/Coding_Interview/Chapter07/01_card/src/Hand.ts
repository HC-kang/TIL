import { Card } from './Card';

export class Hand {
  protected cards: Card[] = [];

  score() {
    let score = 0;
    for (const card of this.cards) {
      score += card.value();
    }
    return score;
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  addCards(cards: Card[]) {
    this.cards.push(...cards);
  }
}
