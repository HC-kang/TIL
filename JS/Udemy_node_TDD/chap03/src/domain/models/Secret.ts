import { SecretValidationError } from '../errors/SecretValidationError';

export class Secret {
  constructor(private secret: string) {
    if (this.secret.length < 3) {
      throw new SecretValidationError('Secret is too short');
    }
  }
}
