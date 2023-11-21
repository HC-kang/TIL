import { BlackJackCard, BlackJackHand, Deck, Suit } from './src';

const cards: BlackJackCard[] = [];
for (let i = 1; i <= 13; i++) {
  cards.push(new BlackJackCard(i, Suit.Clubs));
  cards.push(new BlackJackCard(i, Suit.Diamonds));
  cards.push(new BlackJackCard(i, Suit.Hearts));
  cards.push(new BlackJackCard(i, Suit.Spades));
}

const deck = new Deck();
deck.setDeckOfCards(cards);
deck.shuffle();

console.log(deck.remainingCards()); // 52

const hand1 = new BlackJackHand();
const hand2 = new BlackJackHand();

hand1.addCards(deck.dealHand(2));
hand2.addCards(deck.dealHand(2));

console.log(deck.remainingCards()); // 48
console.log(hand1);
console.log(hand1.score());
console.log(hand2);
console.log(hand2.score());