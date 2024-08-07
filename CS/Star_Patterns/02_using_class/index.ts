import { LeftAlignedStarPattern } from './LeftAlignedStarPattern';
import { RightAlignedStarPattern } from './RightAlignedStarPattern';
import { EquilateralStarPattern } from './EquilateralStarPattern';

const rightAlignedStarPattern = new RightAlignedStarPattern(5);
rightAlignedStarPattern.printPattern();

const leftAlignedStarPattern = new LeftAlignedStarPattern(5);
leftAlignedStarPattern.printPattern();

const equilateralStarPattern = new EquilateralStarPattern(5);
equilateralStarPattern.printPattern();
