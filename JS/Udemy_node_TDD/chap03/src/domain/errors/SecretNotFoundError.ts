export class SecretNotFoundError extends Error {
  constructor() {
    super('Secret was not found in the system');
    this.name = 'SecretNotFoundError';
  }
}
