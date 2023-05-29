import { NextFunction, request, Request, response, Response } from 'express';
import { SecretsByIdController } from '../../../../../src/adapters/rest/controllers/SecretsByIdController';
import { ValidationError } from '../../../../../src/adapters/rest/controllers/ValidationError';
import { Secret } from '../../../../../src/domain/models/Secret';
import { SecretNotFoundInRepositoryError } from '../../../../../src/domain/models/errors/SecretNotFoundInRepositoryError';
import { SecretRetriever } from '../../../../../src/domain/ports/in/SecretRetriever';

describe('Secrets By Id Tests', () => {
  it('should throw an error when sending an invalid url', async () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecret: jest.fn(),
    };

    const secretsByIdController = new SecretsByIdController(secretRetriever);
    await secretsByIdController.retrieveSecretByUrl(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new ValidationError('URL is not valid'));
  });

  it('should throw an error when secret is not found', async () => {
    const req: Request = expect.any(request);
    req.params = { urlId: '123456qwerty' };
    const res: Response = expect.any(response);
    const next: NextFunction = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecret: jest.fn().mockImplementation(async () => {
        throw new SecretNotFoundInRepositoryError();
      }),
    };

    const secretsByIdController = new SecretsByIdController(secretRetriever);
    await secretsByIdController.retrieveSecretByUrl(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new SecretNotFoundInRepositoryError());
  });

  it('should return a secret when it is found', async () => {
    const req: Request = expect.any(request);
    req.params = { urlId: '123456qwerty' };
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecret: jest.fn().mockResolvedValue(new Secret('123qwe')),
    };

    const secretsByIdController = new SecretsByIdController(secretRetriever);
    await secretsByIdController.retrieveSecretByUrl(req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ secret: '123qwe' });
  });
});
