import { UrlIdValidationError } from '../../../../src/domain/errors/UrlIdValidationError';
import { UrlId } from '../../../../src/domain/models/UrlId';

describe('UrlId Tests', () => {
  it('should create an instance of UrlId', () => {
    expect(new UrlId('123456qwerty')).toBeInstanceOf(UrlId);
  });

  it('should throw an error when attempting to create a urlId that is too short', () => {
    expect(() => new UrlId('123')).toThrow(
      new UrlIdValidationError('UrlId is too short')
    );
  });

  it('should return a string representation on the toString method', () => {
    expect(new UrlId('wqesdfasfsdfs').toString()).toBe('wqesdfasfsdfs');
  });
});
