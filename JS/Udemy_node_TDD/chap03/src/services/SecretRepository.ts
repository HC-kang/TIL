import { Secret } from "../domain/models/Secret";
import { UrlId } from "../domain/models/UrlId";

export interface SecretRepository {
  getSecretByUrlId(urlId: UrlId): Promise<Secret | null>;
}