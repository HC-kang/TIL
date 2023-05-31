import { request, response, Request, Response } from 'express';
import { UrlIdValidationError } from '../../src/UrlIdValidationError';
import { SecretsByIdController } from '../../src/rest/SecretsByIdController';

describe('SecretsByIdController Tests', () => {
  it('should return an error if the urlId is too short', () => {
    const req: Request = expect.any(request);
    req.params = {
      urlId: '123',
    };
    const res: Response = expect.any(response);
    const next = jest.fn();

    const secretsByIdController = new SecretsByIdController();
    secretsByIdController.retrieveSecret(req, res, next);
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new UrlIdValidationError('UrlId is too short'));
  });
});
