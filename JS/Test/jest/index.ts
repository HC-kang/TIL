import { describe, it, expect } from '../mini-jest';

describe('Calculator', () => {
  it('should add numbers correctly', () => {
    expect(2 + 2).toBe(4);
  });

  it('should handle arrays', () => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });

  it('this test should be failed', () => {
    expect(1).toBe(2);
  });
});

describe('Another Suite', () => {
  it('should handle arrays', () => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });
});
