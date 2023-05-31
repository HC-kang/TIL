import supertest from 'supertest';
import server from '../src/server';

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

  xit('should return an error when the secret does not exist in the system', () => {});

  xit('should return an error when the urlId provided is not valid', () => {});
});
