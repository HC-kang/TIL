import { SecretNotFoundError } from '../../../src/domain/errors/SecretNotFoundError';
import { UrlId } from '../../../src/domain/models/UrlId';
import { OneTimeSecretRetriever } from '../../../src/services/OneTimeSecretRetriever';
import { SecretRepository } from '../../../src/services/SecretRepository';

describe('OneTimeSecretRetriever Tests', () => {
  it('should throw an error if the Secret was not found', () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: jest.fn().mockResolvedValue(null),
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
  });
});
