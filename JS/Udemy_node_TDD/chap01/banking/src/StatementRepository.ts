import { Statement } from './Statement';

export interface StatementRepository {
  addStatement(statement: Statement): void;
  getAllStatements(): Statement[];
}
