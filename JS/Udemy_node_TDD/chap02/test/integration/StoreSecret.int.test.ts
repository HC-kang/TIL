import supertest from 'supertest';
import server from '../../src/server';
const request = supertest(server.app);

import { SecretModel } from '../../src/adapters/repositories/SecretModel';

const mockMongoose = {
  connect: jest.fn(),
  connection: {
    readyState: 0,
  },
};

describe('Store Secrets from One Time Secret API Integration Tests', () => {
  it('should store a secret in the database', async () => {
    mockMongoose.connection.readyState = 1;
    SecretModel.create = jest.fn();

    const res = await request.post('/api/v1/secrets').send({
      secret: '123qwe',
    });

    expect(res.status).toBe(201);
    expect(res.body.urlId.length).toBeGreaterThanOrEqual(10);

    expect(SecretModel.create).toBeCalledTimes(1);
    expect(SecretModel.create).toBeCalledWith({
      urlId: res.body.urlId,
      secret: '123qwe',
    });
  });

  it('should recieve an error if the secret is smaller than 3 characters', async () => {
    mockMongoose.connection.readyState = 1;
    SecretModel.create = jest.fn();

    const res = await request.post('/api/v1/secrets').send({
      secret: '11',
    });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      title: 'SecretTooShortError',
      message: 'Secret is too short',
    });

    expect(SecretModel.create).toBeCalledTimes(0);
  });
});
