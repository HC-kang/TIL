import { UrlIdTooShortError } from './errors/UrlIdTooShortError';

export class UrlId {
  constructor(private urlId: string) {
    if (urlId.length < 10) throw new UrlIdTooShortError();
  }

  toString(): string {
    return this.urlId;
  }
}
