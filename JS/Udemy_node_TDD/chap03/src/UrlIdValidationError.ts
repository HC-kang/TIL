export class UrlIdValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UrlIdValidationError';
  }
}
