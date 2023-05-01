import { Secret } from "../models/Secret";
import { UrlId } from "../models/UrlId";


export interface SecretRetriever {
  retrieveSecretByUrlId(urlId: UrlId): Promise<Secret>;
}
