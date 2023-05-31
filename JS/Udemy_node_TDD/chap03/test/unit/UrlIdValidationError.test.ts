import { UrlIdValidationError } from "../../src/UrlIdValidationError";

describe('UrlIdValidationError Tests', () => {
  it('should create a UrlIdValidationError', () => {
    const error = new UrlIdValidationError('UrlId is too short');
    expect(error).toBeInstanceOf(UrlIdValidationError);
    expect(error.name).toBe('UrlIdValidationError');
    expect(error.message).toBe('UrlId is too short');
  });
});