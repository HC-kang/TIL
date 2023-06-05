import uniqid from 'uniqid';
import { TokenGenerator } from './TokenGenerator';

export class UniqidTokenGenerator implements TokenGenerator {
  generateToken(): string {
    return uniqid();
  }
}
