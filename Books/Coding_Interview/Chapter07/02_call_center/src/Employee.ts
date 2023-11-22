import { Call } from './Call';
import { CallHandler } from './CallHandler';

export class Employee {
  private currentCall: Call | null;
  protected rank: Rank;

  constructor(handler: CallHandler) {
    this.currentCall = null;
    this.rank = Rank.Responder;
  }

  receiveCall(call: Call) {
    this.currentCall = call;
  }

  callCompleted() {
    if (this.currentCall !== null) {
      this.currentCall.disconnect();
      this.currentCall = null;
    }
  }

  escalateAndReassign() {
    if (this.currentCall !== null) {
      this.currentCall.incrementRank();
      this.currentCall = null;
    }
  }

  assignNewCall(): boolean {
    if (!this.isFree()) {
      return false;
    }
    return true;
  }

  isFree(): boolean {
    return this.currentCall === null;
  }

  getRank(): Rank {
    return this.rank;
  }
}
