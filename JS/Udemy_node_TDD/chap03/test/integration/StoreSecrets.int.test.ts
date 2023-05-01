import supertest from 'supertest';
import server from '../../src/server';
import { SecretModel } from '../../src/infra/repositories/SecretModel';

const mockMongoose = {
  connect: jest.fn(),
  connection: {
    on: jest.fn(),
    close: jest.fn(),
    readyState: 0,
  },
};

const request = supertest(server);

describe('Store secrets integration tests', () => {
  it('should return an error if the body is not present in the request', async () => {
    mockMongoose.connection.readyState = 1;
    const response = await request.post('/api/v1/secrets');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Request body format is not valid',
    });
  });
  it('should return an error if the body does not have a secret', async () => {
    mockMongoose.connection.readyState = 1;
    const response = await request.post('/api/v1/secrets').send({
      hello: 'hi!',
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Request body format is not valid',
    });
  });
  it('should return an error if the secret is not a string', async () => {
    mockMongoose.connection.readyState = 1;
    const response = await request.post('/api/v1/secrets').send({
      secret: 1234567890,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Secret is not a string',
    });
  });
  it('should return an error if the secret is too short', async () => {
    mockMongoose.connection.readyState = 1;
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
    SecretModel.create = jest.fn();
    // mock db
    mockMongoose.connection.readyState = 1;
    const response = await request.post('/api/v1/secrets').send({
      secret: 'myValidSecret',
    });

    expect(response.status).toBe(201);
    expect(response.body.urlId.length).toBeGreaterThanOrEqual(10)
  });
  xit('should return an unhandled exception error', async () => {});
});
