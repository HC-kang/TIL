import { Secret } from '../../src/Secret';
import { SecretValidationError } from '../../src/SecretValidationError';

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
