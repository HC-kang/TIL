import mongoose from 'mongoose';

interface ISecretSchema extends mongoose.Document {
  urlId: string;
  secret: string;
}

const SecretSchema = new mongoose.Schema({
  urlId: String,
  secret: String,
});

export const SecretModel = mongoose.model<ISecretSchema>(
  'Secrets',
  SecretSchema
);
