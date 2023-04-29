import { NextFunction, Request, Response } from 'express';
import { SecretNotFoundError } from '../../domain/errors/SecretNotFoundError';
import { UrlIdValidationError } from '../../domain/errors/UrlIdValidationError';

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  if (error instanceof SecretNotFoundError) {
    response.status(404).json({
      name: error.name,
      message: error.message,
    });
  } else if (error instanceof UrlIdValidationError) {
    response.status(400).json({
      name: error.name,
      message: error.message,
    });
  } else {
    response.status(500).json({
      name: 'InternalServerError',
      message: 'Something went wrong',
    });
  }
}
