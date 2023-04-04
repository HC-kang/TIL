import { UrlIdTooShortError } from './UrlIdTooShortError';

export class UrlId {
  constructor(private urlId: string) {
    if (urlId.length < 10) throw new UrlIdTooShortError();
  }
}
