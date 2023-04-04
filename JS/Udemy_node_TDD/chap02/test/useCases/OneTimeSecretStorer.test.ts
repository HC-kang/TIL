import { Secret } from '../../src/models/Secret';
import { UrlId } from '../../src/models/UrlId';
import { OneTimeSecretStorer } from '../../src/useCases/OneTimeSecretStorer';
import { SecretRepository } from '../../src/useCases/SecretRepository';
import { TokenGenerator } from '../../src/useCases/TokenGenerator';

describe('OneTimeSecretStorer Tests', () => {
  it('should store a secret and return a urlId to query after', async () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: jest.fn(),
      removeSecretByUrlId: jest.fn(),
      storeUrlIdAndSecret: jest.fn(),
    };
    const tokenGenerator: TokenGenerator = {
      generateToken: jest.fn().mockReturnValue('123456qwerty'),
    };
    const oneTimeSecretStorer = new OneTimeSecretStorer(
      secretRepository,
      tokenGenerator
    );
    const secret = new Secret('123qwe');
    const urlId = new UrlId('123456qwerty');
    expect(await oneTimeSecretStorer.storeSecret(secret)).toEqual(urlId);
    expect(secretRepository.storeUrlIdAndSecret).toBeCalledWith(urlId, secret);
  });
});
