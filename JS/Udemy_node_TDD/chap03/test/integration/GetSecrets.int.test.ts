import supertest from 'supertest';
import server from '../../src/server';
import { SecretModel } from '../../src/infra/repositories/mongo/SecretModel';

const mockMongoose = {
  connect: jest.fn(),
  connection: {
    on: jest.fn(),
    close: jest.fn(),
    readyState: 0,
  },
};

const request = supertest(server);

describe('Get secrets integration Test', () => {
  it('should return an error when the urlId provided is too short', async () => {
    mockMongoose.connection.readyState = 1;
    const response = await request.get('/api/v1/secrets/2short');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: 'UrlIdValidationError',
      message: 'UrlId is too short',
    });
  });
  it('should return an error when the secret does not exist in the system', async () => {
    SecretModel.findOne = jest.fn().mockReturnValue(null);
    mockMongoose.connection.readyState = 1;
    const response = await request.get(
      '/api/v1/secrets/1234123412341234123412341234'
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      name: 'SecretNotFoundError',
      message: 'Secret was not found in the system',
    });
  });
  it('should retrieve a secret from the system', async () => {
    SecretModel.findOne = jest.fn().mockReturnValue({
      secret: 'mySecret',
    });
    SecretModel.deleteOne = jest.fn();
    mockMongoose.connection.readyState = 1;

    const response = await request.get(
      '/api/v1/secrets/1234123412341234123412341234'
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      secret: 'mySecret',
    });
    expect(SecretModel.deleteOne).toBeCalledTimes(1);
    expect(SecretModel.deleteOne).toBeCalledWith({
      urlId: '1234123412341234123412341234',
    });
  });
  it('should throw a 500 error when unexpected error is thrown', async () => {
    SecretModel.findOne = jest.fn().mockImplementation(async () => {
      throw new Error('Connection refused');
    });
    mockMongoose.connection.readyState = 1;

    const response = await request.get(
      '/api/v1/secrets/1234123412341234123412341234'
    );

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      name: 'InternalServerError',
      message: 'Something went wrong',
    });
  });
});
