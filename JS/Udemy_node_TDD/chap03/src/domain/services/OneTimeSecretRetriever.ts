import { SecretNotFoundError } from "../errors/SecretNotFoundError";
import { Secret } from "../models/Secret";
import { UrlId } from "../models/UrlId";
import { SecretRepository } from "../../infra/repositories/SecretRepository";
import { SecretRetriever } from "./SecretRetriever";

export class OneTimeSecretRetriever implements SecretRetriever {
  constructor(private secretRepository: SecretRepository) {}

  async retrieveSecretByUrlId(urlId: UrlId): Promise<Secret> {
    const secret = await this.secretRepository.getSecretByUrlId(urlId);
    if (secret === null) throw new SecretNotFoundError();
    await this.secretRepository.removeSecretByUrlId(urlId);
    return secret;
  } 
}