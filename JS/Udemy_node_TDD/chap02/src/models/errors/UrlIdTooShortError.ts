export class UrlIdTooShortError extends Error {
  constructor() {
    super('UrlId is too short');
    this.name = 'UrlIdTooShortError';
  }
}