import mongoose from 'mongoose';
import { Secret } from '../../domain/models/Secret';
import { UrlId } from '../../domain/models/UrlId';
import { SecretRepository } from '../../domain/ports/out/SecretRepository';

export class MongoSecretRepository implements SecretRepository {
  constructor() {
    this.setConnection();
  }

  getSecretByUrlId(urlId: UrlId): Promise<Secret> {
    throw new Error('Method not implemented.');
  }
  removeSecretByUrlId(urlId: UrlId): Promise<void> {
    throw new Error('Method not implemented.');
  }
  storeUrlIdAndSecret(urlId: UrlId, secret: Secret): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private async setConnection() {
    await mongoose.connect('mongodb://localhost:27017/onetimesecret');
    console.log('Connected to mongo!');
  }
}
