import { Secret } from '../Secret';
import { UrlId } from '../UrlId';

export interface SecretRepository {
  getSecretByUrlId(urlId: UrlId): Promise<Secret>;
  removeSecretByUrlId(urlId: UrlId): Promise<void>;
  storeUrlIdAndSecret(urlId: UrlId, secret: Secret): Promise<void>;
}
