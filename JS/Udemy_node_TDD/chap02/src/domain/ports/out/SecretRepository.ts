import { Secret } from '../../models/Secret';
import { UrlId } from '../../models/UrlId';

export interface SecretRepository {
  getSecretByUrlId(urlId: UrlId): Promise<Secret>;
  removeSecretByUrlId(urlId: UrlId): Promise<void>;
  storeUrlIdAndSecret(urlId: UrlId, secret: Secret): Promise<void>;
}
