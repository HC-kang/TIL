import { UniqidTokenGenerator } from '../../../src/adapters/externalServices/UniqidTokenGenerator';

jest.mock('uniqid');
import uniqid from 'uniqid';
const mockUniqid = uniqid as jest.MockedFunction<typeof uniqid>;

describe('UniqidTokenGenerator Tests', () => {
  it('should generate a token that is longer than 10 characters', () => {
    mockUniqid.mockReturnValue('123456qwerty');
    const uniqidTokenGenerator = new UniqidTokenGenerator();
    const token = uniqidTokenGenerator.generateToken();
    expect(token).toBe('123456qwerty');
    expect(token.length).toBeGreaterThanOrEqual(10);
  });
});
