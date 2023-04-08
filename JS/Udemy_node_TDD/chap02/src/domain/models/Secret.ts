import { SecretTooShortError } from './errors/SecretTooShortError';

export class Secret {
  constructor(private secret: string) {
    if (secret.length <= 3) throw new SecretTooShortError();
  }

  toString(): string {
    return this.secret;
  }
}
