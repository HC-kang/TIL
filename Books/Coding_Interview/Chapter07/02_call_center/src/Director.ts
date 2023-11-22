import { CallHandler } from './CallHandler';
import { Employee } from './Employee';
import { Rank } from './Rank';

export class Director extends Employee {
  constructor(handler: CallHandler) {
    super(handler);
    this.rank = Rank.Director;
  }
}
