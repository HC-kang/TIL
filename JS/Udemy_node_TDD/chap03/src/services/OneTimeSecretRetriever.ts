import { SecretNotFoundError } from '../domain/errors/SecretNotFoundError';
import { Secret } from '../domain/models/Secret';
import { SecretRepository } from './SecretRepository';
import { SecretRetriever } from './SecretRetriever';

export class OneTimeSecretRetriever implements SecretRetriever {
  constructor(private secretRepository: SecretRepository) {}

  async retrieveSecretByUrlId(urlId: any): Promise<Secret> {
    const secret = await this.secretRepository.getSecretByUrlId(urlId);
    if (secret === null) throw new SecretNotFoundError();
    // try to retrieve a secret
    // if found, return secret && remove the secret
    // if not found, throw an error
    await this.secretRepository.removeSecretByUrlId(urlId);
    return secret;
  }
}