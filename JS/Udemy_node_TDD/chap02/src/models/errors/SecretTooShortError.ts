export class SecretTooShortError extends Error {
  constructor() {
    super('Secret is too short');
    this.name = 'SecretTooShortError';
  }
}
