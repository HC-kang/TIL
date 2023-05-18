import { UrlId } from '../../../src/domain/models/UrlId';
import { UrlIdTooShortError } from '../../../src/domain/models/errors/UrlIdTooShortError';

describe('UrlId Tests', () => {
  it('should create an instance of UrlId Class', () => {
    expect(new UrlId('123456qwerty')).toBeInstanceOf(UrlId);
  });

  it('should throw an Error if the urlId has less than 10 chars', () => {
    expect(() => new UrlId('123456789')).toThrow(UrlIdTooShortError);
  });
});
