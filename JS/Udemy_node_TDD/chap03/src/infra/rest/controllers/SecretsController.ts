import { NextFunction, Request, Response } from 'express';
import { RequestValidationError } from '../middlewares/RequestValidationError';
import { Secret } from '../../../domain/models/Secret';
import { SecretStorer } from '../../../domain/services/SecretStorer';

export class SecretsController {
  constructor(private secretStorer: SecretStorer) {}
  
storeSecret = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!request.body?.secret)
        throw new RequestValidationError('Request body format is not valid');
      if (typeof request.body?.secret !== 'string')
        throw new RequestValidationError('Secret is not a string');
      const secret = new Secret(request.body.secret);
      const urlId = await this.secretStorer.storeSecret(secret);
      response.status(201).json(urlId)
    } catch (error) {
      next(error);
    }
  };
}
