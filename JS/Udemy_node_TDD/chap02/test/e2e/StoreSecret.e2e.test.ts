import supertest from 'supertest';
import server from '../../src/server';
const request = supertest(server.app);

import { SecretModel } from '../../src/adapters/repositories/SecretModel';

describe('Store Secrets from One Time Secret API End2End Tests', () => {
  beforeAll(async () => {
    await SecretModel.deleteMany({})
  })
  it('should store a secret in the database', async () => {
    const res = await request.post('/api/v1/secrets').send({
      secret: '123qwe',
    });

    expect(res.status).toBe(201);
    expect(res.body.urlId.length).toBeGreaterThanOrEqual(10);
  });
  it('should have create a secret in the database', async () => {
    const doc = await SecretModel.findOne({ 
      secret: '123qwe'
    })
    expect(doc.secret).toBe('123qwe')
    expect(doc.urlId.length).toBeGreaterThanOrEqual(10);
    expect(typeof doc.urlId).toBe('string');
  })
  it('should receive an error when sending a secret too short', async () => {
    const res = await request.post('/api/v1/secrets').send({
      secret: '12',
    });

    expect(res.status).toBe(400)
    expect(res.body).toEqual({
      title: 'SecretTooShortError',
      message: 'Secret is too short'
    })
  })
  it('should receive an error when body is not correct', async () => {
    const res = await request.post('/api/v1/secrets').send({
      password: '123qwe',
    });

    expect(res.status).toBe(400)
    expect(res.body).toEqual({
      title: 'ValidationError',
      message: 'Request body not valid'
    })
  })
  it('should receive an error when type of the secret is not valid', async () => {
    const res = await request.post('/api/v1/secrets').send({
      secret: 123456,
    });

    expect(res.status).toBe(400)
    expect(res.body).toEqual({
      title: 'ValidationError',
      message: 'Request body not valid'
    })
  })
});
