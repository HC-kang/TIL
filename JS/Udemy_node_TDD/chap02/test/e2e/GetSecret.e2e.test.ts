import supertest from 'supertest';
import server from '../../src/server';
const request = supertest(server.app);

import { SecretModel } from '../../src/adapters/repositories/SecretModel';

describe('Get Secrets from One Time Secret API End2End Tests', () => {
  beforeAll(async () => {
    await SecretModel.deleteMany({});
    await SecretModel.create({urlId: '123456qwerty', secret: '123qwe'});
  });
  it('should retrieve a secret from database', async () => {
    const res = await request.get('/api/v1/secrets/123456qwerty');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ secret: '123qwe' });
  });

  it('should retrieve an not found error if try to get same secret twice', async () => {
    const res = await request.get('/api/v1/secrets/123456qwerty');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      title: 'SecretNotFoundInRepositoryError',
      message: 'Secret was not found in the repository',
    });
  });

  it('should retrieve an not found error if it does not exist', async () => {
    const res = await request.get('/api/v1/secrets/fakeinventedurlid');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      title: 'SecretNotFoundInRepositoryError',
      message: 'Secret was not found in the repository',
    });
  });

  it('should retrieve an error if the url is not valid', async () => {
    const res = await request.get('/api/v1/secrets/qwe');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      title: 'UrlIdTooShortError',
      message: 'UrlId must have at least 10 chars',
    });
  });
});
