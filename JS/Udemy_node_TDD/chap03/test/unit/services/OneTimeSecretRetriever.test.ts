import { SecretNotFoundError } from '../../../src/domain/errors/SecretNotFoundError';
import { Secret } from '../../../src/domain/models/Secret';
import { UrlId } from '../../../src/domain/models/UrlId';
import { OneTimeSecretRetriever } from '../../../src/services/OneTimeSecretRetriever';
import { SecretRepository } from '../../../src/services/SecretRepository';

describe('OneTimeSecretRetriever Tests', () => {
  it('should throw an error if the Secret was not found', () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: jest.fn().mockResolvedValue(null),
      removeSecretByUrlId: jest.fn(),
      storeUrlIdAndSecret: jest.fn(),
    };
    const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository);

    const urlId = new UrlId('123456qwerty');
    expect(oneTimeSecretRetriever.retrieveSecretByUrlId(urlId)).rejects.toThrow(
      SecretNotFoundError
    );
    expect(secretRepository.getSecretByUrlId).toBeCalledTimes(1);
    expect(secretRepository.getSecretByUrlId).toBeCalledWith(
      new UrlId('123456qwerty')
    );
    expect(secretRepository.removeSecretByUrlId).toBeCalledTimes(0);
  });
  it('should return a secret when it is found ', async () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: jest.fn().mockResolvedValue(new Secret('qwe123')),
      removeSecretByUrlId: jest.fn(),
      storeUrlIdAndSecret: jest.fn(),
    };
    const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository);

    const urlId = new UrlId('123456qwerty');
    expect(await oneTimeSecretRetriever.retrieveSecretByUrlId(urlId)).toEqual(
      new Secret('qwe123')
    );
    expect(secretRepository.getSecretByUrlId).toBeCalledTimes(1);
    expect(secretRepository.getSecretByUrlId).toBeCalledWith(
      new UrlId('123456qwerty')
    );
    expect(secretRepository.removeSecretByUrlId).toBeCalledTimes(1);
    expect(secretRepository.removeSecretByUrlId).toBeCalledWith(
      new UrlId('123456qwerty')
    );
  });
});
