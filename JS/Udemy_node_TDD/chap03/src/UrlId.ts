import { UrlIdValidationError } from "./UrlIdValidationError";

export class UrlId {
  constructor(private urlId: string) {
    if (this.urlId.length < 10) throw new UrlIdValidationError('UrlId is too short');
  }
}