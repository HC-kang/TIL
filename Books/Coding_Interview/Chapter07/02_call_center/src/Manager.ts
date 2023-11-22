import { Rank } from './Rank';
import { Employee } from './Employee';
import { CallHandler } from './CallHandler';

export class Manager extends Employee {
  constructor(handler: CallHandler) {
    super(handler);
    this.rank = Rank.Manager;
  }
}
