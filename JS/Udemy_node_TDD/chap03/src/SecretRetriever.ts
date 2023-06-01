import { Secret } from "./Secret";
import { UrlId } from "./UrlId";

export interface SecretRetriever {
  retrieveSecretByUrlId(urlId: UrlId): Promise<Secret>;
}