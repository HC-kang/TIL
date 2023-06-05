import { request, response, Request, Response } from 'express';
import { SecretNotFoundError } from '../../../../../src/domain/errors/SecretNotFoundError';
import { UrlIdValidationError } from '../../../../../src/domain/errors/UrlIdValidationError';
import { Secret } from '../../../../../src/domain/models/Secret';
import { UrlId } from '../../../../../src/domain/models/UrlId';
import { SecretRetriever } from '../../../../../src/domain/services/SecretRetriever';
import { SecretsByIdController } from '../../../../../src/infra/rest/controllers/SecretsByIdController';

describe('SecretsByIdController Tests', () => {
  it('should return an error if the urlId is too short', () => {
    const req: Request = expect.any(request);
    req.params = {
      urlId: '123',
    };
    const res: Response = expect.any(response);
    const next = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecretByUrlId: jest.fn(),
    };
    const secretsByIdController = new SecretsByIdController(secretRetriever);
    secretsByIdController.retrieveSecret(req, res, next);
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new UrlIdValidationError('UrlId is too short'));
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledTimes(0);
  });

  it('should throw an error if the secret was not found', async () => {
    const req: Request = expect.any(request);
    req.params = {
      urlId: 'asdfasdfsdfNonExistSecret',
    };
    const res: Response = expect.any(response);
    const next = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecretByUrlId: jest.fn().mockImplementation(async () => {
        throw new SecretNotFoundError();
      }),
    };
    const secretsByIdController = new SecretsByIdController(secretRetriever);
    await secretsByIdController.retrieveSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new SecretNotFoundError());
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledTimes(1);
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledWith(
      new UrlId('asdfasdfsdfNonExistSecret')
    );
  });

  it('should respond with a secret when it is found', async () => {
    const req: Request = expect.any(request);
    req.params = {
      urlId: 'asdfasdfsdfNonExistSecret',
    };
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecretByUrlId: jest
        .fn()
        .mockResolvedValue(new Secret('aasdfasdf')),
    };
    const secretsByIdController = new SecretsByIdController(secretRetriever);
    await secretsByIdController.retrieveSecret(req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledTimes(1);
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledWith(
      new UrlId('asdfasdfsdfNonExistSecret')
    );
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      secret: 'aasdfasdf',
    });
  });
});
