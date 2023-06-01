 export class SecretValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SecretValidationError';
  }
 }