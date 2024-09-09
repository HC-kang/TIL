import { LeftAlignedStarPattern } from './LeftAlignedStarPattern';
import { RightAlignedStarPattern } from './RightAlignedStarPattern';
import { EquilateralStarPattern } from './EquilateralStarPattern';

const rightAlignedStarPattern = new RightAlignedStarPattern();
rightAlignedStarPattern.printPattern(5);

const leftAlignedStarPattern = new LeftAlignedStarPattern();
leftAlignedStarPattern.printPattern(5);

const equilateralStarPattern = new EquilateralStarPattern();
equilateralStarPattern.printPattern(5);
