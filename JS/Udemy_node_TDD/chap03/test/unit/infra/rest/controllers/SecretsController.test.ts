import { request, response, Request, Response } from 'express';
import { SecretValidationError } from '../../../../../src/domain/errors/SecretValidationError';
import { Secret } from '../../../../../src/domain/models/Secret';
import { UrlId } from '../../../../../src/domain/models/UrlId';
import { SecretStorer } from '../../../../../src/domain/services/SecretStorer';
import { RequestValidationError } from '../../../../../src/infra/rest/controllers/RequestValidationError';
import { SecretsController } from '../../../../../src/infra/rest/controllers/SecretsController';

describe('SecretsController Tests', () => {
  it('should throw an error if the secret is not present in the body', () => {
    const req: Request = expect.any(request);
    req.body ={
      asd:'asd',
    }
    const res: Response = expect.any(response);
    const next = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    }

    const secretsController = new SecretsController(secretStorer);
    secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(
      new RequestValidationError('Request body format is not valid')
    );
  });

  it('should throw an error if the secret is not a string', () => {
    const req: Request = expect.any(request);
    req.body ={
      secret: 123123123,
    }
    const res: Response = expect.any(response);
    const next = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    }

    const secretsController = new SecretsController(secretStorer);
    secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(
      new RequestValidationError('Secret is not a string')
    );
  });

  it('should throw an error if the secret is too short', () => {
    const req: Request = expect.any(request);
    req.body ={
      secret: '12',
    }
    const res: Response = expect.any(response);
    const next = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    }

    const secretsController = new SecretsController(secretStorer);
    secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(
      new SecretValidationError('Secret is too short')
    );
  });

  it('should store the secret and return the urlId', async () => {
    const req: Request = expect.any(request);
    req.body ={
      secret: 'myValidSecrets',
    }
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn().mockResolvedValue(new UrlId('asdfasdfasdf'))
    }

    const secretsController = new SecretsController(secretStorer);
    await secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(secretStorer.storeSecret).toBeCalledTimes(1)
    expect(secretStorer.storeSecret).toBeCalledWith(new Secret('myValidSecrets'))
    expect(res.status).toBeCalledTimes(1)
    expect(res.status).toBeCalledWith(201)
    expect(res.json).toBeCalledTimes(1)
    expect(res.json).toBeCalledWith(new UrlId('asdfasdfasdf'))
  });
});
