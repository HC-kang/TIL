import { NextFunction, request, response, Request, Response } from 'express';
import { SecretsController } from '../../../../../src/adapters/rest/controllers/SecretsController';
import { ValidationError } from '../../../../../src/adapters/rest/controllers/ValidationError';
import { UrlId } from '../../../../../src/domain/models/UrlId';
import { SecretStorer } from '../../../../../src/domain/ports/in/SecretStorer';

describe('Secrets Tests', () => {
  it('should throw a validation error if the body of the request is not provided', () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    };

    const secretsController = new SecretsController(secretStorer);
    secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new ValidationError('Request body not valid'));
  });
  it('should throw a validation error if the body does not have a secret', () => {
    const req: Request = expect.any(request);
    req.body = { abc: 'abc' };
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    };

    const secretsController = new SecretsController(secretStorer);
    secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new ValidationError('Request body not valid'));
  });
  it('should throw a validation error if the secret is not a string', () => {
    const req: Request = expect.any(request);
    req.body = { abc: 123 };
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    };

    const secretsController = new SecretsController(secretStorer);
    secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new ValidationError('Request body not valid'));
  });
  it('should create a valid secret', async () => {
    const req: Request = expect.any(request);
    req.body = { secret: '123qwe' };
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn().mockResolvedValue(new UrlId('123456qwerty')),
    };

    const secretsController = new SecretsController(secretStorer);
    await secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ urlId: '123456qwerty' });
  });
});
