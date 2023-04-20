import mongoose from "mongoose";
import { Secret } from "../../domain/models/Secret";
import { UrlId } from "../../domain/models/UrlId";
import { SecretRepository } from "../../services/SecretRepository";

export class MongoSecretRepository implements SecretRepository {
  constructor() {
    mongoose.connect('mongodb://localhost:27017/onetimesecretb')
  }

  getSecretByUrlId(urlId: UrlId): Promise<Secret> {
    throw new Error("Method not implemented.");
  }
}