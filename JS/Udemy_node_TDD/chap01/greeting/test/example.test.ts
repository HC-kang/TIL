import { greeting } from "../src/Greeting";

describe('Greeting Tests', () => {
  it('should greet the morning when it is morning', () => {
    Date.prototype.getHours = jest.fn().mockReturnValue(7);
    expect(greeting()).toBe('Good morning!');
  });
  it('should greet the afternoon when it is afternoon', () => {
    Date.prototype.getHours = jest.fn().mockReturnValue(14);
    expect(greeting()).toBe('Good afternoon!');
  });
  it('should greet the evening when it is evening', () => {
    Date.prototype.getHours = jest.fn().mockReturnValue(20);
    expect(greeting()).toBe('Good evening!');
  });
  it('should greet the night when it is night', () => {
    Date.prototype.getHours = jest.fn().mockReturnValue(22);
    expect(greeting()).toBe('Good night!');
  });
  it('should greet the night when it is night', () => {
    Date.prototype.getHours = jest.fn().mockReturnValue(2);
    expect(greeting()).toBe('Good night!');
  });
});

