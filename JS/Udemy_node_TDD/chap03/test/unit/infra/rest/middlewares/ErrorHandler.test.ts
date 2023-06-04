import { request, response, Request, Response, NextFunction } from 'express';
import { UrlIdValidationError } from '../../../../../src/domain/errors/UrlIdValidationError';
import { errorHandler } from '../../../../../src/infra/rest/middlewares/ErrorHandler';
import { SecretNotFoundError } from '../../../../../src/domain/errors/SecretNotFoundError';
import { RequestValidationError } from '../../../../../src/infra/rest/RequestValidationError';
import { SecretValidationError } from '../../../../../src/domain/errors/SecretValidationError';

describe('Errorhandler tests', () => {
  it('should generate an Error response for a UrlIdValidationError', () => {
    const error = new UrlIdValidationError('UrlId is too short');

    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    errorHandler(error, req, res, next);
    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: 'UrlIdValidationError',
      message: 'UrlId is too short',
    });
  });

  it('should generate an Error response for a SecretNotFoundError', () => {
    const error = new SecretNotFoundError();

    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    errorHandler(error, req, res, next);
    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: 'SecretNotFoundError',
      message: 'Secret was not found in the system',
    });
  });

  it('should generate a generic Error for uncontrolled situations', () => {
    const error = new Error('There is fire');

    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    errorHandler(error, req, res, next);
    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: 'InternalServerError',
      message: 'Something went wrong',
    });
  });

  it('should generate an Error response for a RequestValidationError', () => {
    const error = new RequestValidationError('Request body is not provided');

    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    errorHandler(error, req, res, next);
    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: 'RequestValidationError',
      message: 'Request body is not provided',
    });
  });

  it('should generate an Error response for a SecretValidationError', () => {
    const error = new SecretValidationError('Secret is too short');

    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    errorHandler(error, req, res, next);
    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: 'SecretValidationError',
      message: 'Secret is too short',
    });
  });
});
