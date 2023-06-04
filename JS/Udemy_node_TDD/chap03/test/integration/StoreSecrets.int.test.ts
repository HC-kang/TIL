import supertest from 'supertest';
import server from '../../src/server';

const request = supertest(server);

describe('Store Secrets integration tests', () => {
  it('should return an error if the body is not present in the repository', async () => {
    const response = await request.post('/api/v1/secrets');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Request body is not provided',
    });
  });

  xit('should return an error if the body does not have a secret', async () => {});

  xit('should return an error if the secret is not a string', async () => {});

  xit('should return an error if the secret is too short', async () => {});

  xit('should store a secret and return the urlId', async () => {});

  xit('should return an unhandled exception error', async () => {});
});
