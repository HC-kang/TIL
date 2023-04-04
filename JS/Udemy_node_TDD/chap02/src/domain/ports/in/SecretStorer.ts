import { Secret } from '../../models/Secret';
import { UrlId } from '../../models/UrlId';

export interface SecretStorer {
  storeSecret(secret: Secret): Promise<UrlId>;
}
