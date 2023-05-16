export class Statement {
  constructor(
    private date: Date,
    private amount: number,
    private balance: number
  ) {}

  toString(): string {
    const month = this.date.getMonth() + 1;
    const day = this.date.getDate();
    return (
      `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${this.date.getFullYear()}` +
      `\t\t${this.amount > 0 ? '+' : ''}${this.amount}\t\t${this.balance}`
    );
  }
}
