import { UniqidTokenGenerator } from '../../../../src/infra/externalServices/UniqidTokenGenerator';

jest.mock('uniqid');
import uniqid from 'uniqid';
const mockUniqId = uniqid as jest.MockedFunction<typeof uniqid>

describe('UniqidTokenGenerator test', () => {
  it('should generate a token', () => {
    mockUniqId.mockReturnValue('1234567890MyUniqToken')
    const uniqidTokenGenerator = new UniqidTokenGenerator();

    expect(uniqidTokenGenerator.generateToken()).toBe('1234567890MyUniqToken');
  });
});
