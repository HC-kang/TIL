import { Secret } from "../Secret";
import { UrlId } from "../UrlId";

export interface SecretStorer {
  storeSecret(secret: Secret): Promise<UrlId>;
}