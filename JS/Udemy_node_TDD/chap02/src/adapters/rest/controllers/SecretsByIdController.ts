import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './ValidationError';
import { SecretRetriever } from '../../../domain/ports/in/SecretRetrievers';
import { UrlId } from '../../../domain/models/UrlId';

export class SecretsByIdController {
  constructor(private secretRetriever: SecretRetriever) {}

  retrieveSecretByUrl = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      this.validateRequest(request);

      const urlId = new UrlId(request.params.urlId);
      const secret = await this.secretRetriever.retrieveSecret(urlId);

      response.status(200).json(secret);
    } catch (e) {
      next(e);
    }
  };

  private validateRequest(request: Request) {
    if (!request.params?.urlId) throw new ValidationError('URL is not valid');
  }
}
