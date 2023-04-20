import mongoose from 'mongoose';
import { MongoSecretRepository } from '../../../../src/infra/repositories/MongoSecretRepository';

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
    mongoose.connect = jest.fn();

    new MongoSecretRepository();
    expect(mongoose.connect).toBeCalledTimes(0);
  });
});
