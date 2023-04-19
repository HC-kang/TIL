import { SecretValidationError } from "../../../../src/domain/errors/SecretValidationError";
import { Secret } from "../../../../src/domain/models/Secret";

describe('Secret Tests', () => {
  it('should create an instance of secret', () => {
    expect(new Secret('mySecret')).toBeInstanceOf(Secret);
  });
  it('should throw an error when secret is too short', () => {
    expect(() => new Secret('1')).toThrow(
      new SecretValidationError('Secret is too short')
    );
  });
});
