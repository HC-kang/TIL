import { SecretValidationError } from "./SecretValidationError";

export class Secret {
  constructor(private secret: string) {
    if (secret.length < 3)
      throw new SecretValidationError('Secret is too short');
  }
}
