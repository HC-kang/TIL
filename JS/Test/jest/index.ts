import { describe, it, expect } from '../mini-jest';

describe('테스트 스위트', () => {
  it('should add numbers correctly', () => {
    expect(2 + 2).toBe(4);
  });

  describe('중첩된 테스트 스위트(for toEqual)', () => {
    it('should handle arrays', () => {
      expect([1, 2, 3]).toEqual([1, 2, 3]);
    });

    it('should handle objects', () => {
      expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
    });

    it('should handle strings', () => {
      expect('hello').toEqual('hello');
    });
  });

  it('should handle in', () => {
    expect([1, 2, 3]).toContain(2);
  });

  it('should handle throw', () => {
    expect(() => {
      throw new Error('test');
    }).toThrow('test');
  });

  it('this test should be failed', () => {
    expect(1).toBe(2);
  });
});

describe('다른 테스트 스위트', () => {
  it('should handle arrays', () => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });
});
