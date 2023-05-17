import { Secret } from "../Secret";
import { UrlId } from "../UrlId";
import { SecretRepository } from "./SecretRepository";
import { SecretRetriever } from "./SecretRetriever";

export class OneTimeSecretRetriever implements SecretRetriever {
  constructor(private secretRepository: SecretRepository) {}

  async retrieveSecret(urlId: UrlId): Promise<Secret> {
    const secret = this.secretRepository.getSecretByUrlId(urlId);
    await this.secretRepository.removeSecretByUrlId(urlId);
    return secret;
  }
}