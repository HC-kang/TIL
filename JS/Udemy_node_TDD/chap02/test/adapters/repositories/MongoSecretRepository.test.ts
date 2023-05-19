import mongoose from 'mongoose';
import { MongoSecretRepository } from '../../../src/adapters/repositories/MongoSecretRepository';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    readyState: 1,
  },
}))

describe('MongoSecretRepository Tests', () => {
  it('should connect to the database', () => {
    mongoose.connect = jest.fn();
    new MongoSecretRepository();
    expect(mongoose.connect).toBeCalledTimes(1);
    expect(mongoose.connect).toBeCalledWith('mongodb://localhost:27017/onetimesecret');
  })

  it('should not connect to the database if the connection is already open', () => {
    mongoose.connect = jest.fn();
    mongoose.connection.readyState = 1;
    expect(mongoose.connect).toBeCalledTimes(1);
    expect(mongoose.connect).toBeCalledWith('mongodb://localhost:27017/onetimesecret');
  })
})