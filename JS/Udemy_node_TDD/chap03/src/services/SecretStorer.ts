import { Secret } from '../domain/models/Secret';
import { UrlId } from '../domain/models/UrlId';

export interface SecretStorer {
  storeSecret(secret: Secret): Promise<UrlId>;
}
