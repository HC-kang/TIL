export const Rank = {
  Director: 0,
  Manager: 1,
  Responder: 2,
} as const;

export type Rank = (typeof Rank)[keyof typeof Rank];
