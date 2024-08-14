import { Printable } from './Printable';
import { RightAlignedStarPattern } from './RightAlignedStarPattern';
import { LeftAlignedStarPattern } from './LeftAlignedStarPattern';
import { EquilateralStarPattern } from './EquilateralStarPattern';

const printable = new Printable();

const rightAlignedStarPattern = new RightAlignedStarPattern(printable, 5);
const leftAlignedStarPattern = new LeftAlignedStarPattern(printable, 5);
const equilateralStarPattern = new EquilateralStarPattern(printable, 5);

rightAlignedStarPattern.printPattern();
leftAlignedStarPattern.printPattern();
equilateralStarPattern.printPattern();
