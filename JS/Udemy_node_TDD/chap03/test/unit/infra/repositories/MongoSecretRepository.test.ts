import mongoose from 'mongoose';
import { MongoSecretRepository } from '../../../../src/infra/repositories/MongoSecretRepository';
import { UrlId } from '../../../../src/domain/models/UrlId';
import { SecretModel } from '../../../../src/infra/repositories/SecretModel';

const mockMongoose = {
  connect: jest.fn(),
  connection: {
    on: jest.fn(),
    close: jest.fn(),
    readyState: 0,
  },
};

describe('Mongo Secret Repository Tests', () => {
  it('should connect to the database', () => {
    mongoose.connect = jest.fn();

    new MongoSecretRepository();
    expect(mongoose.connect).toBeCalledTimes(1);
    expect(mongoose.connect).toBeCalledWith(
      'mongodb://localhost:27017/onetimesecretb'
    );
  });
  it('should not connect to the database when connection is already established', () => {
    mockMongoose.connect = jest.fn();
    mockMongoose.connection.readyState = 1;

    new MongoSecretRepository();
    expect(mockMongoose.connect).toBeCalledTimes(0);
  });
  it('should return a null object when the secret is not found', async () => {
    SecretModel.findOne = jest.fn().mockReturnValue(null);
    mockMongoose.connect = jest.fn();
    mockMongoose.connection.readyState = 1;

    const urlId = new UrlId('123456qwerty')
    const mongoSecretRepository = new MongoSecretRepository();
    expect(await mongoSecretRepository.getSecretByUrlId(urlId)).toBe(null)
    expect(mockMongoose.connect).toBeCalledTimes(0);
  });
});
