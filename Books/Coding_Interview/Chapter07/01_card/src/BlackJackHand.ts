import { BlackJackCard } from './BlackJackCard';
import { Hand } from './Hand';

export class BlackJackHand extends Hand {
  protected cards: BlackJackCard[] = [];

  score(): number {
    const scores = this.possibleScores();
    let maxUnder = -1;
    let minOver = 22;
    for (const score of scores) {
      if (score > 21 && score < minOver) {
        minOver = score;
      } else if (score <= 21 && score > maxUnder) {
        maxUnder = score;
      }
    }
    return maxUnder === -1 ? minOver : maxUnder;
  }

  private possibleScores(): number[] {
    const scores = [0];
    for (const card of this.cards) {
      this.addCardToScoreList(card, scores);
    }
    return scores;
  }

  private addCardToScoreList(card: BlackJackCard, scores: number[]) {
    const length = scores.length;
    for (let i = 0; i < length; i++) {
      const score = scores[i];
      scores[i] = score + card.value();
      if (card.value() === 1) {
        scores.push(score + 11);
      }
    }
  }

  busted(): boolean {
    return this.score() > 21;
  }

  is21(): boolean {
    return this.score() === 21;
  }

  isBlackJack(): boolean {
    if (this.cards.length !== 2) {
      return false;
    }
    const first = this.cards[0];
    const second = this.cards[1];
    return (
      (first.isAce() && second.isFaceCard()) ||
      (second.isAce() && first.isFaceCard())
    );
  }
}
