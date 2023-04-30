import { RequestValidationError } from '../../../../src/infra/rest/RequestValidationError';

describe('RequestValidationError Tests', () => {
  it('should create a RequestValidationError error', () => {
    const error = new RequestValidationError('Request body is not valid');
    expect(error).toBeInstanceOf(
      RequestValidationError
    );
    expect(error.name).toBe('RequestValidationError');
    expect(error.message).toBe('Request body is not valid');
  });
});
