import { LeftAlignedStarPattern } from './LeftAlignedStarPattern';
import { RightAlignedStarPattern } from './RightAlignedStarPattern';
import { EquilateralStarPattern } from './EquilateralStarPattern';

const rightAlignedStarPattern = new RightAlignedStarPattern();
const leftAlignedStarPattern = new LeftAlignedStarPattern();
const equilateralStarPattern = new EquilateralStarPattern();

rightAlignedStarPattern.printPattern(5);
leftAlignedStarPattern.printPattern(5);
equilateralStarPattern.printPattern(5);
