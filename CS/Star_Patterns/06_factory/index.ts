import { Printable } from './Printable';
import { RightAlignedStarPattern } from './RightAlignedStarPattern';
import { LeftAlignedStarPattern } from './LeftAlignedStarPattern';
import { EquilateralStarPattern } from './EquilateralStarPattern';
import { SimpleStarFactory } from './SimpleStarFactory';
import { SimpleSpaceFactory } from './SimpleSpaceFactory';
import { EmojiStarFactory } from './EmojiStarFactory';

const printable = new Printable();
const simpleStarFactory = new SimpleStarFactory();
const emojiStartFactory = new EmojiStarFactory();
const simpleSpaceFactory = new SimpleSpaceFactory();

const rightAlignedStarPattern = new RightAlignedStarPattern(
  printable,
  simpleStarFactory,
  simpleSpaceFactory,
  5
);
const leftAlignedStarPattern = new LeftAlignedStarPattern(
  printable,
  simpleStarFactory,
  simpleSpaceFactory,
  5
);
const equilateralStarPattern = new EquilateralStarPattern(
  printable,
  emojiStartFactory,
  simpleSpaceFactory,
  5
);

rightAlignedStarPattern.printPattern();
leftAlignedStarPattern.printPattern();
equilateralStarPattern.printPattern();
