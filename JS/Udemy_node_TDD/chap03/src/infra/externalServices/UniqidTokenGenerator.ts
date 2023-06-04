import uniqid from 'uniqid';
import { TokenGenerator } from '../../services/TokenGenerator';

export class UniqidTokenGenerator implements TokenGenerator {
  generateToken(): string {
    return uniqid();
  }
}
