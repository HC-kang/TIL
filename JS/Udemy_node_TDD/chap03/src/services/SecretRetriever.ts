import { Secret } from "../models/Secret";
import { UrlId } from "./UrlId";

export interface SecretRetriever {
  retrieveSecretByUrlId(urlId: UrlId): Promise<Secret>;
}