export class Statement {
  constructor(
    private date: Date,
    private amount: number,
    private balance: number
  ) {}

  toString(): string {
    const day = this.date.getDate();
    const month = this.date.getMonth() + 1;
    return (
      `${day < 10 ? '0' + day : day}.${
        month < 10 ? '0' + month : month
      }.${this.date.getFullYear()}` + `\t${this.amount > 0 ? '+' : ''}${this.amount}\t\t${this.balance}`
    );
  }
}
