import { TokenGenerator } from '../../domain/services/TokenGenerator';
import uniqid from 'uniqid';

export class UniqidTokenGenerator implements TokenGenerator {
  generateToken(): string {
    return uniqid();
  }
}
