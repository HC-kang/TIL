import mongoose from 'mongoose';
import { MongoSecretRepository } from '../../../../src/infra/repositories/MongoSecretRepository';
import { UrlId } from '../../../../src/domain/models/UrlId';
import { SecretModel } from '../../../../src/infra/repositories/SecretModel';
import { Secret } from '../../../../src/domain/models/Secret';

const mockMongoose = {
  connect: jest.fn(),
  connection: {
    readyState: 0,
  },
};

describe('MongoSecretRepository', () => {
  it('should connect to the database', () => {
    mongoose.connect = jest.fn();

    new MongoSecretRepository();
    expect(mongoose.connect).toBeCalledTimes(1);
    expect(mongoose.connect).toBeCalledWith(
      'mongodb://localhost:27017/onetimesecret'
    );
  });

  it('should not connect to the database when connection is already established', () => {
    mockMongoose.connection.readyState = 1;

    new MongoSecretRepository();
    expect(mockMongoose.connect).toBeCalledTimes(0);
  });

  it('should return a null object when the secret is not found', async () => {
    SecretModel.findOne = jest.fn().mockResolvedValue(null);
    mockMongoose.connect = jest.fn();
    mockMongoose.connection.readyState = 1;

    const urlId = new UrlId('123456qwerty');
    const mongoSecretRepository = new MongoSecretRepository();
    expect(await mongoSecretRepository.getSecretByUrlId(urlId)).toBe(null);
    expect(mockMongoose.connect).toBeCalledTimes(0);
  });

  it('should return the secret when the secret is found', async () => {
    SecretModel.findOne = jest.fn().mockResolvedValue({
      secret: '123qwe',
    });
    mockMongoose.connect = jest.fn();
    mockMongoose.connection.readyState = 1;

    const urlId = new UrlId('123456qwerty');
    const mongoSecretRepository = new MongoSecretRepository();
    expect(await mongoSecretRepository.getSecretByUrlId(urlId)).toEqual(
      new Secret('123qwe')
    );
    expect(mockMongoose.connect).toBeCalledTimes(0);
    expect(SecretModel.findOne).toBeCalledTimes(1);
    expect(SecretModel.findOne).toBeCalledWith({ urlId: '123456qwerty' });
  });

  it('should remove a secret from the database', async () => {
    SecretModel.deleteOne = jest.fn();
    mockMongoose.connect = jest.fn();
    mockMongoose.connection.readyState = 1;

    const urlId = new UrlId('123456qwerty');
    const mongoSecretRepository = new MongoSecretRepository();
    await mongoSecretRepository.removeSecretByUrlId(urlId);
    expect(SecretModel.deleteOne).toBeCalledTimes(1);
    expect(SecretModel.deleteOne).toBeCalledWith({ urlId: '123456qwerty' });
  });

  it('should store UrlId and Secret into the database', async () => {
    SecretModel.create = jest.fn();
    mockMongoose.connect = jest.fn();
    mockMongoose.connection.readyState = 1;

    const urlId = new UrlId('123456qwerty');
    const secret = new Secret('asdlasdfhjkl')
    const mongoSecretRepository = new MongoSecretRepository();
    await mongoSecretRepository.storeUrlIdAndSecret(urlId, secret);
    expect(SecretModel.create).toBeCalledTimes(1);
    expect(SecretModel.create).toBeCalledWith({ urlId: '123456qwerty', secret: 'asdlasdfhjkl' });
  });
});
