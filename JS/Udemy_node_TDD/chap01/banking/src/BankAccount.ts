import { Statement } from './Statement';
import { StatementRepository } from './StatementRepository';

interface Account {
  deposit(amount: number): void;
  withdraw(amount: number): void;
  printStatement(): void;
}

export class BankAccount implements Account {
  private balance = 0;

  constructor(private statementRepository: StatementRepository) {}

  deposit(amount: number): void {
    this.balance = this.balance + amount;
    const statement = new Statement(new Date(), amount, this.balance);
    this.statementRepository.addStatement(statement);
  }

  withdraw(amount: number): void {
    this.balance = this.balance - amount;
    const statement = new Statement(new Date(), -amount, this.balance);
    this.statementRepository.addStatement(statement);
  }

  printStatement(): void {
    console.log('Date\t\tAmount\t\tBalance');
    for (const statement of this.statementRepository.getAllStatements()) {
      console.log(statement.toString());
    }
  }
}
