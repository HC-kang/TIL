import { Secret } from '../../../../src/domain/models/Secret';
import { UrlId } from '../../../../src/domain/models/UrlId';
import { SecretRepository } from '../../../../src/domain/ports/out/SecretRepository';
import { TokenGenerator } from '../../../../src/domain/ports/out/TokenGenerator';
import { OneTimeSecretStorer } from '../../../../src/domain/useCases/OneTimeSecretStorer';

describe('OneTimeSecretStorer', () => {
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
    expect(await oneTimeSecretStorer.storeSecret(secret)).toEqual(
      new UrlId('123456qwerty')
    );
    expect(secretRepository.storeUrlIdAndSecret).toBeCalledTimes(1);
    expect(secretRepository.storeUrlIdAndSecret).toBeCalledWith(urlId, secret);
    expect(tokenGenerator.generateToken).toBeCalledTimes(1);
  });
});
