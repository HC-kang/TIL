import { LeftAlignedStarPattern } from './LeftAlignedStarPattern';
import { RightAlignedStarPattern } from './RightAlignedStarPattern';
import { EquilateralStarPattern } from './EquilateralStarPattern';

const rightAlignedStarPattern = new RightAlignedStarPattern(5);
const leftAlignedStarPattern = new LeftAlignedStarPattern(5);
const equilateralStarPattern = new EquilateralStarPattern(5);

rightAlignedStarPattern.printPattern();
leftAlignedStarPattern.printPattern();
equilateralStarPattern.printPattern();
