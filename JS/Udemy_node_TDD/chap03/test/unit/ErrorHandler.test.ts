import { NextFunction, Request, request, Response, response } from 'express';
import { UrlIdValidationError } from '../../src/UrlIdValidationError';
import { errorHandler } from '../../src/rest/ErrorHandler';

describe('ErrorHandler tests', () => {
  it('should generate an Error response for a UrlIdValidationError ', () => {
    const error = new UrlIdValidationError('UrlId is too short.');
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
      message: 'UrlId is too short.',
    });
  });
});
