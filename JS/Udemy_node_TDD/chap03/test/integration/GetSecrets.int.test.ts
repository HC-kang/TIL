import supertest from 'supertest';
import server from '../../src/server';
import { SecretModel } from '../../src/infra/repositories/SecretModel';

const request = supertest(server);

describe('Get secrets integration tests', () => {
  it('should return an error when the urlId provided is too short', async () => {
    const response = await request.get('/api/v1/secrets/short');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'UrlIdValidationError',
      message: 'UrlId is too short',
    });
  });

  it('should return an error when the secret does not exist in the system', async () => {
    SecretModel.findOne = jest.fn().mockResolvedValue(null);
    const response = await request.get('/api/v1/secrets/asdfasdfsdfNonExistSecret');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      name: 'SecretNotFoundError',
      message: 'Secret was not found in the system',
    });
  });

  xit('should return an error when the urlId provided is not valid', () => {});
  xit('should throw a 500 error when unexpected error is thrown', () => {});
});
