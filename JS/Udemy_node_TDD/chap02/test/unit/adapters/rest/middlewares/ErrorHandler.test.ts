import { NextFunction, Request, Response, request, response } from 'express';
import { ValidationError } from '../../../../../src/adapters/rest/controllers/ValidationError';
import { errorHandler } from '../../../../../src/adapters/rest/middlewares/ErrorHandler';
import { SecretNotFoundInRepositoryError } from '../../../../../src/domain/models/errors/SecretNotFoundInRepositoryError';
import { SecretTooShortError } from '../../../../../src/domain/models/errors/SecretTooShortError';
import { UrlIdTooShortError } from '../../../../../src/domain/models/errors/UrlIdTooShortError';

describe('ErrorHandler Tests', () => {
  it('should send a uncontrolled error', () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    const error = new Error('Server got fire');
    errorHandler(error, req, res, next);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      title: 'InternalServerError',
      message: 'Something went wrong',
    });
  });
  it('should send a validation error', () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    const error = new ValidationError('body is not present');
    errorHandler(error, req, res, next);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      title: 'ValidationError',
      message: 'body is not present',
    });
  });
  it('should send a UrlId too short error', () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    const error = new UrlIdTooShortError();
    errorHandler(error, req, res, next);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      title: 'UrlIdTooShortError',
      message: 'UrlId is too short',
    });
  });
  it('should send a Secret too short error', () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    const error = new SecretTooShortError();
    errorHandler(error, req, res, next);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      title: 'SecretTooShortError',
      message: 'Secret is too short',
    });
  });
  it('should send a Secret too short error', () => {
    const req: Request = expect.any(request);
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    const next: NextFunction = jest.fn();

    const error = new SecretNotFoundInRepositoryError();
    errorHandler(error, req, res, next);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      title: 'SecretNotFoundInRepositoryError',
      message: 'Secret was not found in the repository',
    });
  });
});
