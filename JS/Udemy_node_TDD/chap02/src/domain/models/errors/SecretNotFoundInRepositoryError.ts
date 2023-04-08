export class SecretNotFoundInRepositoryError extends Error {
  constructor() {
    super('Secret was not found in the repository');
    this.name = 'SecretNotFoundInRepositoryError';
  }
}
