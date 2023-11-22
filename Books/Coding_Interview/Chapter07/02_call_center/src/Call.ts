import { Rank } from './Rank';
import { Caller } from './Caller';
import { Employee } from './Employee';

export class Call {
  // 이 전화를 처리 할 수 있는 최소 직급
  private rank: Rank;

  private caller: Caller;

  private handler: Employee | null;

  constructor(caller: Caller) {
    this.rank = Rank.Responder;
    this.caller = caller;
  }

  setHandler(emp: Employee) {
    this.handler = emp;
  }

  getRank() {
    return this.rank;
  }

  setRank(rank: Rank) {
    this.rank = rank;
  }

  incrementRank() {
    if (this.rank === Rank.Responder) {
      this.rank = Rank.Manager;
    } else if (this.rank === Rank.Manager) {
      this.rank = Rank.Director;
    }
  }

  reply(message: string) {
    console.log(message);
  }

  disconnect() {
    console.log('disconnect');
  }
}
