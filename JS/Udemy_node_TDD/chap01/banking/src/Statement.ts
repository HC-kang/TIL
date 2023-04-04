export class Statement {
  constructor(
    private date: Date,
    private amount: number,
    private balance: number
  ) {}

  toString(): string {
    const month = this.date.getMonth() + 1;
    const date = this.date.getDate();
    return (
      `${this.date.getDate() < 10 ? '0' + date : date}` +
      `.${month < 10 ? '0' + month : month}` +
      `.${this.date.getFullYear()}` +
      `\t${this.amount > 0 ? '+' : ''}${this.amount}\t\t${this.balance}`
    );
  }
}
