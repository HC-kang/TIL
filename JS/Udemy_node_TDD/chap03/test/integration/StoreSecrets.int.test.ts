import supertest from 'supertest';
import server from '../../src/server';

const request = supertest(server);

describe('Store Secrets integration tests', () => {
  it('should return an error if the body does not have a secret', async () => {
    const response = await request.post('/api/v1/secrets').send({
      hello: 'hi',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Request body format is not valid',
    });
  });

  it('should return an error if the secret is not a string', async () => {
    const response = await request.post('/api/v1/secrets').send({
      secret: 123123123,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Secret is not a string',
    });
  });

  it('should return an error if the secret is too short', async () => {
    const response = await request.post('/api/v1/secrets').send({
      secret: '12',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'SecretValidationError',
      message: 'Secret is too short',
    });
  });

  it('should store a secret and return the urlId', async () => {
    // mock db
    const response = await request.post('/api/v1/secrets').send({
      secret: 'myValidSecret',
    });

    expect(response.status).toBe(201);
    expect(response.body.urlId.length).toBeGreaterThanOrEqual(10);
  });

  xit('should return an unhandled exception error', async () => {});
});
