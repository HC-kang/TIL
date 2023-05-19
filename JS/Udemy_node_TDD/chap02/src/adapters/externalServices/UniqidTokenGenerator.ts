import { TokenGenerator } from '../../domain/ports/out/TokenGenerator';
import uniqid from 'uniqid';

export class UniqidTokenGenerator implements TokenGenerator {
  generateToken(): string {
    return uniqid();
  }
}
