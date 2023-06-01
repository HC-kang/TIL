import { SecretValidationError } from "../../../../src/domain/errors/SecretValidationError";

describe('SecretValidationError Tests', () => {
  it('should create a SecretValidationError', () => {
    const error = new SecretValidationError('Secret is too short');
    expect(error).toBeInstanceOf(SecretValidationError);
    expect(error.name).toBe('SecretValidationError');
    expect(error.message).toBe('Secret is too short');
  });
});