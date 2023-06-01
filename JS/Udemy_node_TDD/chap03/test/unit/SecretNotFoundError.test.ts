import { SecretNotFoundError } from "../../src/SecretNotFoundError";

describe('SecretNotFoundError Tests', () => {
  it('should create a SecretNotFoundError', () => {
    const error = new SecretNotFoundError();
    expect(error).toBeInstanceOf(SecretNotFoundError);
    expect(error.name).toBe('SecretNotFoundError');
    expect(error.message).toBe('Secret was not found in the system');
  });
});