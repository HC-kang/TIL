import { Statement } from './Statement';
import { StatementRepository } from './StatementRepository';

export class BankStatementRepository implements StatementRepository {
  private statements = new Array<Statement>();

  addStatement(statement: Statement): void {
    this.statements.push(statement);
  }
  getAllStatements(): Statement[] {
    return this.statements;
  }
}
