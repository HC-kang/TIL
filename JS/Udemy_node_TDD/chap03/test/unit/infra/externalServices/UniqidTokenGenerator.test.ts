import { UniqidTokenGenerator } from "../../../../src/infra/externalServices/UniqidTokenGenerator";

jest.mock('uniqid');
import uniqid from 'uniqid';
const mockUniqid = uniqid as jest.MockedFunction<typeof uniqid>;

describe('UniqidTokenGenerator', () => {
  it('should generate a token', () => {
    mockUniqid.mockReturnValue('asodhflsandfolas;dflas');
    const uniqidTokenGenerator = new UniqidTokenGenerator();

    expect(uniqidTokenGenerator.generateToken()).toBe('asodhflsandfolas;dflas');
  });
});