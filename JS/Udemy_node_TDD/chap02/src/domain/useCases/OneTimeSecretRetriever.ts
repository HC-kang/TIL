import { Secret } from '../models/Secret';
import { UrlId } from '../models/UrlId';
import { SecretRepository } from '../ports/out/SecretRepository';
import { SecretRetriever } from '../ports/in/SecretRetrievers';

export class OneTimeSecretRetriever implements SecretRetriever {
  constructor(private secretRepository: SecretRepository) {}
  async retrieveSecret(urlId: UrlId): Promise<Secret> {
    const secret = await this.secretRepository.getSecretByUrlId(urlId);
    await this.secretRepository.removeSecretByUrlId(urlId);
    return secret;
  }
}
