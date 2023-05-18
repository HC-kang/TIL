import { Secret } from '../models/Secret';
import { UrlId } from '../models/UrlId';
import { SecretStorer } from '../ports/in/SecretStorer';
import { SecretRepository } from '../ports/out/SecretRepository';
import { TokenGenerator } from '../ports/out/TokenGenerator';

export class OneTimeSecretStorer implements SecretStorer {
  constructor(private secretRepository: SecretRepository, private tokenGenerator: TokenGenerator) {}

  async storeSecret(secret: Secret): Promise<UrlId> {
    const token = this.tokenGenerator.generateToken();
    const urlId = new UrlId(token);
    await this.secretRepository.storeUrlIdAndSecret(urlId, secret);
    return urlId;
  }
}
