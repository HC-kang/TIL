import { Secret } from '../../models/Secret';
import { UrlId } from '../../models/UrlId';

export interface SecretRetriever {
  retrieveSecret(urlId: UrlId): Promise<Secret>;
}
