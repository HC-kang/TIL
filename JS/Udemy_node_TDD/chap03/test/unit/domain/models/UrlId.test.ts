import { UrlId } from "../../../../src/domain/models/UrlId";
import { UrlIdValidationError } from "../../../../src/domain/errors/UrlIdValidationError";

describe('UrlId Tests', () => {
  it('should create an instance of UrlId', () => {
    expect(new UrlId('1234567890')).toBeInstanceOf(UrlId);
  })
  it('should throw an error when attempting to create a UrlId that is too short', () => {
    expect(() => new UrlId('123456789')).toThrowError(new UrlIdValidationError('UrlId is too short'));
  })
})