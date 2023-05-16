import { Secret } from "../src/Secret";
import { SecretTooShortError } from "../src/errors/SecretTooShortError";

describe('Secret Tests', () => {
  it('should create an instance of Secret Class', () => {
    expect(new Secret('123qwe')).toBeInstanceOf(Secret);
  });

  it('should throw an Error in the secret has less than 3 chars', () => {
    expect(() => new Secret('12')).toThrow(SecretTooShortError);
  });
});
