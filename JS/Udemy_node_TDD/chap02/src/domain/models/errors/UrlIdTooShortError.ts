export class UrlIdTooShortError extends Error {
  constructor() {
    super('UrlId must have at least 10 chars');
    this.name = 'UrlIdTooShortError';
  }
}