import { BankAccount } from '../src/BankAccount';
import { Statement } from '../src/Statement';
import { StatementRepository } from '../src/StatementRepository';

describe('Account tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should print the header of the statements', () => {
    const logSpy = jest.spyOn(console, 'log');
    const mockRepository: StatementRepository = {
      addStatement: jest.fn(),
      getAllStatements: jest.fn().mockReturnValue([]),
    };
    const accounts = new BankAccount(mockRepository);
    accounts.printStatement();
    expect(logSpy).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith('Date\tAmount\t\tBalance');
  });

  it('should print the header and one deposit statement', () => {
    const logSpy = jest.spyOn(console, 'log');
    const statement1 = new Statement(new Date('2025-03-15'), 400, 400);
    const mockRepository: StatementRepository = {
      addStatement: jest.fn(),
      getAllStatements: jest.fn().mockReturnValue([statement1]),
    };
    const accounts = new BankAccount(mockRepository);

    accounts.deposit(400);
    accounts.printStatement();

    expect(logSpy).toBeCalledTimes(2);
    expect(logSpy).toBeCalledWith('Date\tAmount\t\tBalance');
    expect(logSpy).nthCalledWith(2, '15.03.2025\t\t+400\t\t400');
  });

  it('should print the header and one withdraw statement', () => {
    const logSpy = jest.spyOn(console, 'log');
    const statement1 = new Statement(new Date('2025-03-05'), -400, -400);
    const mockRepository: StatementRepository = {
      addStatement: jest.fn(),
      getAllStatements: jest.fn().mockReturnValue([statement1]),
    };
    const accounts = new BankAccount(mockRepository);

    accounts.withdraw(400);
    accounts.printStatement();

    expect(logSpy).toBeCalledTimes(2);
    expect(logSpy).nthCalledWith(1, 'Date\tAmount\t\tBalance');
    expect(logSpy).nthCalledWith(2, '05.03.2025\t\t-400\t\t-400');
  });

  it('should print the header and two operations', () => {
    const logSpy = jest.spyOn(console, 'log');
    const statement1 = new Statement(new Date('2025-03-05'), -400, -400);
    const statement2 = new Statement(new Date('2025-11-13'), 1400, 1000);
    const mockRepository: StatementRepository = {
      addStatement: jest.fn(),
      getAllStatements: jest.fn().mockReturnValue([statement1, statement2]),
    };
    const accounts = new BankAccount(mockRepository);

    accounts.withdraw(400);
    accounts.deposit(1400);
    accounts.printStatement();

    expect(logSpy).toBeCalledTimes(3);
    expect(logSpy).nthCalledWith(1, 'Date\tAmount\t\tBalance');
    expect(logSpy).nthCalledWith(2, '05.03.2025\t\t-400\t\t-400');
    expect(logSpy).nthCalledWith(3, '13.11.2025\t\t+1400\t\t1000');
  });
});
