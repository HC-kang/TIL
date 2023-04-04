import { UrlId } from '../../src/domain/models/UrlId';
import { UrlIdTooShortError } from '../../src/domain/models/errors/UrlIdTooShortError';

describe('UrlId Test', () => {
  it('should create an instance of Secret class', () => {
    expect(new UrlId('123456qwerty')).toBeInstanceOf(UrlId);
  });
  it('should throw an error if the urlid has less than 10 chars', () => {
    expect(() => new UrlId('12345')).toThrow(UrlIdTooShortError);
  });
});
