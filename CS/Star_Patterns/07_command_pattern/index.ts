import { Printable } from './printers/Printable';
import { PatternPrinter } from './printers/PatternPrinter';
import { PrintPatternCommand } from './commands/PrintPatternCommand';

import { SimpleStarFactory } from './factories/SimpleStarFactory';
import { EmojiStarFactory } from './factories/EmojiStarFactory';
import { SimpleSpaceFactory } from './factories/SimpleSpaceFactory';

import { RightAlignedStarPattern } from './patterns/RightAlignedStarPattern';
import { LeftAlignedStarPattern } from './patterns/LeftAlignedStarPattern';
import { EquilateralStarPattern } from './patterns/EquilateralStarPattern';

const printable = new Printable();
const simpleStarFactory = new SimpleStarFactory();
const emojiStarFactory = new EmojiStarFactory();
const simpleSpaceFactory = new SimpleSpaceFactory();

const rightAlignedStarPattern = new RightAlignedStarPattern(
  printable,
  simpleStarFactory,
  simpleSpaceFactory
);
const leftAlignedStarPattern = new LeftAlignedStarPattern(
  printable,
  simpleStarFactory,
  simpleSpaceFactory
);
const equilateralStarPattern = new EquilateralStarPattern(
  printable,
  emojiStarFactory,
  simpleSpaceFactory
);

const rightAlignedStarPatternCommand = new PrintPatternCommand(
  rightAlignedStarPattern,
  5
);
const leftAlignedStarPatternCommand = new PrintPatternCommand(
  leftAlignedStarPattern,
  5
);
const equilateralStarPatternCommand = new PrintPatternCommand(
  equilateralStarPattern,
  5
);

const patternPrinter = new PatternPrinter(rightAlignedStarPatternCommand);
patternPrinter.print();

patternPrinter.setCommand(leftAlignedStarPatternCommand);
patternPrinter.print();

patternPrinter.setCommand(equilateralStarPatternCommand);
patternPrinter.print();
