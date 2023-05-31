import { UrlId } from "../../src/UrlId";
import { UrlIdValidationError } from "../../src/UrlIdValidationError";

describe('UrlId Tests', () => {
  it('should create an instance of UrlId', () => {
    expect(new UrlId('123456qwerty')).toBeInstanceOf(UrlId);
  })

  it('should throw an error when attempting to create a urlId that is too short', () => {
    expect(() => new UrlId('123')).toThrow(new UrlIdValidationError('UrlId is too short'))
  })
})