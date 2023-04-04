import { SecretTooShortError } from './SecretTooShortError';

export class Secret {
  constructor(private secret: string) {
    if (secret.length <= 3) throw new SecretTooShortError();
  }
}
