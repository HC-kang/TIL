import { UrlIdValidationError } from '../errors/UrlIdValidationError';

export class UrlId {
  constructor(private urlId: string) {
    if (this.urlId.length < 10)
      throw new UrlIdValidationError('UrlId is too short');
  }

  toString(): string {
    return this.urlId;
  }
}
