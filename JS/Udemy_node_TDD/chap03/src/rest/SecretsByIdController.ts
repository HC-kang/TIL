import { NextFunction, Request, Response } from 'express';
import { UrlIdValidationError } from '../UrlIdValidationError';
import { UrlId } from '../UrlId';
import { SecretNotFoundError } from '../SecretNotFoundError';
import { SecretRetriever } from '../SecretRetriever';

export class SecretsByIdController {
  constructor(private secretRetriever: SecretRetriever) {}

  retrieveSecret = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const urlId = new UrlId(request.params.urlId);
      const secret = await this.secretRetriever.retrieveSecretByUrlId(urlId);
    } catch (error) {
      next(error);
    }
  };
}
