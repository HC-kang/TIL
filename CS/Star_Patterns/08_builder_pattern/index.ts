import { SimpleStarFactory } from './factories/SimpleStarFactory';
import { EmojiStarFactory } from './factories/EmojiStarFactory';
import { SimpleSpaceFactory } from './factories/SimpleSpaceFactory';

import { RightAlignedStarPattern } from './patterns/RightAlignedStarPattern';
import { LeftAlignedStarPattern } from './patterns/LeftAlignedStarPattern';
import { EquilateralStarPattern } from './patterns/EquilateralStarPattern';
import { PatternPrinterBuilder } from './builders/PatternPrinterBuilder';

const simpleStarFactory = new SimpleStarFactory();
const emojiStarFactory = new EmojiStarFactory();
const simpleSpaceFactory = new SimpleSpaceFactory();

const patternPrinterBuilder = new PatternPrinterBuilder();
const rightAlignedStarPatternPrinter = patternPrinterBuilder
  .setPatternType(RightAlignedStarPattern)
  .setStarFactory(simpleStarFactory)
  .setSpaceFactory(simpleSpaceFactory)
  .setHeight(5)
  .build();

const leftAlignedStarPatternPrinter = patternPrinterBuilder
  .setPatternType(LeftAlignedStarPattern)
  .setStarFactory(simpleStarFactory)
  .setSpaceFactory(simpleSpaceFactory)
  .setHeight(5)
  .build();

const equilateralStarPatternPrinter = patternPrinterBuilder
  .setPatternType(EquilateralStarPattern)
  .setStarFactory(emojiStarFactory)
  .setSpaceFactory(simpleSpaceFactory)
  .setHeight(5)
  .build();

rightAlignedStarPatternPrinter.print();
leftAlignedStarPatternPrinter.print();
equilateralStarPatternPrinter.print();
