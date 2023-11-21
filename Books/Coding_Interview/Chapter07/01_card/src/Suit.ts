export const Suit = {
  Clubs: 0,
  Diamonds: 1,
  Hearts: 2,
  Spades: 3,
} as const;

export type Suit = (typeof Suit)[keyof typeof Suit];
