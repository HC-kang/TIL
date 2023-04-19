import { Secret } from "../domain/models/Secret";
import { UrlId } from "../domain/models/UrlId";


export interface SecretRetriever {
  retrieveSecretByUrlId(urlId: UrlId): Promise<Secret>;
}
