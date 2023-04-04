import { UrlId } from '../src/UrlId';
import { UrlIdTooShortError } from '../src/UrlIdTooShortError';

describe('UrlId Test', () => {
  it('should create an instance of Secret class', () => {
    expect(new UrlId('123456qwerty')).toBeInstanceOf(UrlId);
  });
  it('should throw an error if the urlid has less than 10 chars', () => {
    expect(() => new UrlId('12345')).toThrow(UrlIdTooShortError);
  });
});
