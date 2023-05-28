import supertest from 'supertest';
import server from '../../src/server';
const request = supertest(server.app);

import mongoose from 'mongoose';
import { SecretModel } from '../../src/adapters/repositories/SecretModel';
import { UrlId } from '../../src/domain/models/UrlId';

const mockMongoose = {
  connect: jest.fn(),
  connection: {
    readyState: 0,
  },
};

describe('Get Secrets from One Time Secret API Integration Tests', () => {
  it('should retrieve a secret from database', async () => {
    mockMongoose.connection.readyState = 1;
    SecretModel.findOne = jest.fn().mockResolvedValue({ secret: '123qwe' });
    SecretModel.deleteOne = jest.fn();

    const res = await request.get('/api/v1/secrets/123456qwerty');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ secret: '123qwe' });

    expect(SecretModel.findOne).toBeCalledTimes(1);
    expect(SecretModel.findOne).toBeCalledWith(new UrlId('123456qwerty'));
    expect(SecretModel.deleteOne).toBeCalledTimes(1);
    expect(SecretModel.deleteOne).toBeCalledWith(new UrlId('123456qwerty'));
  });

  it('should retrieve an error if the secret does not exist in the database', async () => {
    mockMongoose.connection.readyState = 1;
    SecretModel.findOne = jest.fn().mockResolvedValue(null);
    SecretModel.deleteOne = jest.fn();

    const res = await request.get('/api/v1/secrets/123456qwerty');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      title: 'SecretNotFoundInRepositoryError',
      message: 'Secret was not found in the repository',
    });

    expect(SecretModel.findOne).toBeCalledTimes(1);
    expect(SecretModel.findOne).toBeCalledWith(new UrlId('123456qwerty'));
    expect(SecretModel.deleteOne).toBeCalledTimes(0);
  });
});
