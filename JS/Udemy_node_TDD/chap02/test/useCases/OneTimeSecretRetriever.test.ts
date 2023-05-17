import { Secret } from '../../src/Secret';
import { UrlId } from '../../src/UrlId';
import { OneTimeSecretRetriever } from '../../src/useCases/OneTimeSecretRetriever';
import { SecretRepository } from '../../src/useCases/SecretRepository';

describe('OneTimeSecretRetriever', () => {
  it('should retrieve a secret one time', async () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: jest.fn().mockReturnValue(new Secret('123qwe')),
      removeSecretByUrlId: jest.fn(),
      storeUrlIdAndSecret: jest.fn(),
    };
    const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository);
    const urlId = new UrlId('123456qwerty');
    expect(await oneTimeSecretRetriever.retrieveSecret(urlId)).toEqual(
      new Secret('123qwe')
    );
    expect(secretRepository.getSecretByUrlId).toBeCalledTimes(1);
    expect(secretRepository.getSecretByUrlId).toBeCalledWith(urlId);
    expect(secretRepository.removeSecretByUrlId).toBeCalledTimes(1);
    expect(secretRepository.removeSecretByUrlId).toBeCalledWith(urlId);
  });
});
