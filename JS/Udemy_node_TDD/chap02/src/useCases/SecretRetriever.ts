import { Secret } from "../Secret";
import { UrlId } from "../UrlId";

export interface SecretRetriever {
  retrieveSecret(urlId: UrlId): Promise<Secret>;
}