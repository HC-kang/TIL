import { Request, request, Response, response } from 'express';
import { UrlIdValidationError } from '../../../../src/domain/errors/UrlIdValidationError';
import { SecretsByIdController } from '../../../../src/infra/rest/SecretsByIdController';
import { SecretNotFoundError } from '../../../../src/domain/errors/SecretNotFoundError';
import { SecretRetriever } from '../../../../src/services/SecretRetriever';
import { UrlId } from '../../../../src/domain/models/UrlId';

describe('SecretsByIdController Tests', () => {
  it('should throw an error if the urlId is too short', () => {
    const req: Request = expect.any(request);
    req.params = {
      urlId: '123',
    };

    const res: Response = expect.any(response);
    const next = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecretByUrlId: jest.fn(),
    }
    const secretsByIdController = new SecretsByIdController(secretRetriever);
    secretsByIdController.retrieveSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(
      new UrlIdValidationError('UrlId is too short')
    );
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledTimes(0);
  });
  it('should throw an error if the secret was not found', async () => {
    const req: Request = expect.any(request);
    req.params = {
      urlId: '1234123412341234',
    };

    const res: Response = expect.any(response);
    const next = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecretByUrlId: jest.fn().mockImplementation(async () => {
        throw new SecretNotFoundError();
      }),
    }
    const secretsByIdController = new SecretsByIdController(secretRetriever);
    await secretsByIdController.retrieveSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(
      new SecretNotFoundError()
      );
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledTimes(1);
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledWith(new UrlId('1234123412341234'));
  });
});