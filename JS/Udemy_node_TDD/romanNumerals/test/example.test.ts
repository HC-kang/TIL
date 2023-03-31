import { romanNumber } from '../src/romanNumerals';
/*
Example Results
1 >> I          21 >> XXI
2 >> II         50 >> L
3 >> III        97 >> XCVII
4 >> IV         100 >> C
5 >> V          500 >> D
6 >> VI         998 >> CMXCVIII
7 >> VII        999 >> CMXCIX
8 >> VIII       1000 >> M
9 >> IX         1666 >> MDCLXVI
10 >> X
 */

describe('Roman Numerals Tests', () => {
  it("should return 'I' when sending 1", () => {
    expect(romanNumber(1)).toBe('I');
  });
  it("should return 'II' when sending 2", () => {
    expect(romanNumber(2)).toBe('II');
  });
  it("should return 'III' when sending 3", () => {
    expect(romanNumber(3)).toBe('III');
  });
  it("should return 'V' when sending 5", () => {
    expect(romanNumber(5)).toBe('V');
  });
  it("should return 'VII' when sending 7", () => {
    expect(romanNumber(7)).toBe('VII');
  });
  it("should return 'X' when sending 10", () => {
    expect(romanNumber(10)).toBe('X');
  });
  it("should return 'XXXVIII' when sending 38", () => {
    expect(romanNumber(38)).toBe('XXXVIII');
  });
  it("should return 'IV' when sending 4", () => {
    expect(romanNumber(4)).toBe('IV');
  });
  it("should return 'IX' when sending 9", () => {
    expect(romanNumber(9)).toBe('IX');
  });
  it("should return 'XLII' when sending 42", () => {
    expect(romanNumber(42)).toBe('XLII');
  });
  it("should return 'L' when sending 50", () => {
    expect(romanNumber(50)).toBe('L');
  });
  it("should return 'XC' when sending 90", () => {
    expect(romanNumber(90)).toBe('XC');
  });
  it("should return 'CI' when sending 101", () => {
    expect(romanNumber(101)).toBe('CI');
  });
  it("should return 'CDIV' when sending 404", () => {
    expect(romanNumber(404)).toBe('CDIV');
  });
  it("should return 'DCCXXI' when sending 721", () => {
    expect(romanNumber(721)).toBe('DCCXXI');
  });
  it("should return 'MMCMLVII' when sending 2957", () => {
    expect(romanNumber(2957)).toBe('MMCMLVII');
  });
});
