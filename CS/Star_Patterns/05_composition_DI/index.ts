import { Printable } from './Printable';
import { RightAlignedStarPattern } from './RightAlignedStarPattern';
import { LeftAlignedStarPattern } from './LeftAlignedStarPattern';
import { EquilateralStarPattern } from './EquilateralStarPattern';

const printable = new Printable();

const rightAlignedStarPattern = new RightAlignedStarPattern(printable);
const leftAlignedStarPattern = new LeftAlignedStarPattern(printable);
const equilateralStarPattern = new EquilateralStarPattern(printable);

rightAlignedStarPattern.printPattern(5);
leftAlignedStarPattern.printPattern(5);
equilateralStarPattern.printPattern(5);
