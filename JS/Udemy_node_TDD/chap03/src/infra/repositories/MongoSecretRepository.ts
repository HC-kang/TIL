import mongoose from "mongoose";
import { Secret } from "../../domain/models/Secret";
import { UrlId } from "../../domain/models/UrlId";
import { SecretRepository } from "../../services/SecretRepository";
import { SecretModel } from "./SecretModel";

export class MongoSecretRepository implements SecretRepository {
  constructor() {
    if (mongoose.connection.readyState !== 1) {
      mongoose.connect('mongodb://localhost:27017/onetimesecretb')
    }
  }

  async getSecretByUrlId(urlId: UrlId): Promise<Secret | null> {
    const doc = await SecretModel.findOne({ urlId: urlId.toString()})
    if (doc === null) return null;
    return new Secret('123456qwerty')
  }
}