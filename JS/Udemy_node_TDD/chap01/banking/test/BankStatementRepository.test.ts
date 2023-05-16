import { BankStatementRepository } from '../src/BankStatementRepository';
import { Statement } from '../src/Statement';

describe('Account tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should add a new statement in the repository', () => {
    const bankStatementRepository = new BankStatementRepository();
    const statement = new Statement(new Date(), 100, 100);
    bankStatementRepository.addStatement(statement);
    expect(bankStatementRepository.getAllStatements()).toEqual([statement]);
  });
});
