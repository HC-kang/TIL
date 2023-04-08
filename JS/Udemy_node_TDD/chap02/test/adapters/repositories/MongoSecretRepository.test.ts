import mongoose from 'mongoose';
import { MongoSecretRepository } from '../../../src/adapters/repositories/MongoSecretRepository';
import { Secret } from '../../../src/domain/models/Secret';
import { UrlId } from '../../../src/domain/models/UrlId';
import { SecretModel } from '../../../src/adapters/repositories/SecretModel';
import { SecretNotFoundInRepositoryError } from '../../../src/domain/models/errors/SecretNotFoundInRepositoryError';

const mockMongoose = {
  connect: jest.fn(),
  connection: {
    on: jest.fn(),
    close: jest.fn(),
    readyState: 0,
  },
};

describe('MongoSecretRepository Tests', () => {
  it('should connect to the database', () => {
    mongoose.connect = jest.fn();

    new MongoSecretRepository();
    expect(mongoose.connect).toBeCalledTimes(1);
    expect(mongoose.connect).toBeCalledWith(
      'mongodb://localhost:27017/onetimesecret'
    );
  });
  it('should not connect to the database if the connection is already opened', () => {
    // mongoose.connect = jest.fn();
    // mongoose.connection.readyState = 1;
    mockMongoose.connect = jest.fn();
    mockMongoose.connection.readyState = 1;

    new MongoSecretRepository();
    expect(mockMongoose.connect).toBeCalledTimes(0);
  });
  it('should retrieve a secret from mongo', async () => {
    SecretModel.findOne = jest.fn().mockResolvedValue({ secret: '123qwe' });
    const mongoSecretRepository = new MongoSecretRepository();

    const urlId = new UrlId('123456qwerty');
    expect(await mongoSecretRepository.getSecretByUrlId(urlId)).toEqual(
      new Secret('123qwe')
    );
    expect(SecretModel.findOne).toBeCalledTimes(1);
    expect(SecretModel.findOne).toBeCalledWith({ urlId: urlId.toString() });
  });
  it('should throw an error when querying a secret that does not exist', async () => {
    SecretModel.findOne = jest.fn().mockResolvedValue(null);
    const mongoSecretRepository = new MongoSecretRepository();

    const urlId = new UrlId('123456qwerty');
    expect(mongoSecretRepository.getSecretByUrlId(urlId)).rejects.toThrow(SecretNotFoundInRepositoryError);
    expect(SecretModel.findOne).toBeCalledTimes(1);
    expect(SecretModel.findOne).toBeCalledWith({ urlId: urlId.toString() });
  });
  it('should remove a secret from the database', async () => {
    SecretModel.deleteOne = jest.fn();
    const mongoSecretRepository = new MongoSecretRepository();

    const urlId = new UrlId('123456qwerty');
    await mongoSecretRepository.removeSecretByUrlId(urlId);
    expect(SecretModel.deleteOne).toBeCalledTimes(1);
    expect(SecretModel.deleteOne).toBeCalledWith({ urlId: urlId.toString() });
  });
  it('should create a urlId secret in the database', async () => {
    SecretModel.create = jest.fn();
    const mongoSecretRepository = new MongoSecretRepository();

    const urlId = new UrlId('123456qwerty');
    const secret = new Secret('123qwe');
    await mongoSecretRepository.storeUrlIdAndSecret(urlId, secret);
    expect(SecretModel.create).toBeCalledTimes(1);
    expect(SecretModel.create).toBeCalledWith({ urlId: urlId.toString(), secret: secret.toString() });
  });
});
