import { Printable } from './Printable';
import { RightAlignedStarPattern } from './RightAlignedStarPattern';
import { LeftAlignedStarPattern } from './LeftAlignedStarPattern';
import { EquilateralStarPattern } from './EquilateralStarPattern';
import { SimpleStarFactory } from './SimpleStarFactory';
import { SimpleSpaceFactory } from './SimpleSpaceFactory';
import { EmojiStarFactory } from './EmojiStarFactory';

const printable = new Printable();
const simpleStarFactory = new SimpleStarFactory();
const emojiStarFactory = new EmojiStarFactory();
const simpleSpaceFactory = new SimpleSpaceFactory();

const rightAlignedStarPattern = new RightAlignedStarPattern(
  printable,
  simpleStarFactory,
  simpleSpaceFactory,
);
const leftAlignedStarPattern = new LeftAlignedStarPattern(
  printable,
  simpleStarFactory,
  simpleSpaceFactory,
);
const equilateralStarPattern = new EquilateralStarPattern(
  printable,
  emojiStarFactory,
  simpleSpaceFactory,
);

rightAlignedStarPattern.printPattern(5);
leftAlignedStarPattern.printPattern(5);
equilateralStarPattern.printPattern(5);
