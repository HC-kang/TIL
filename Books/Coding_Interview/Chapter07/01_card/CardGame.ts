import { Card, Suit, Deck, Hand } from './src';

const cards: Card[] = [];
for (let i = 1; i <= 13; i++) {
  cards.push(new Card(i, Suit.Clubs));
  cards.push(new Card(i, Suit.Diamonds));
  cards.push(new Card(i, Suit.Hearts));
  cards.push(new Card(i, Suit.Spades));
}

const deck = new Deck();
deck.setDeckOfCards(cards);
deck.shuffle();

console.log(deck.remainingCards()); // 52
const hand1 = new Hand();
const hand2 = new Hand();
const hand3 = new Hand();
const hand4 = new Hand();

hand1.addCards(deck.dealHand(5));
hand2.addCards(deck.dealHand(5));
hand3.addCards(deck.dealHand(5));
hand4.addCards(deck.dealHand(5));

console.log(deck.remainingCards()); // 32
console.log(hand1);
console.log(hand1.score());