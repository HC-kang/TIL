import { Call } from './Call';
import { Caller } from './Caller';
import { Employee } from './Employee';

export class CallHandler {
  // 직급은 세 종류로 구성된다. 고객 응대 담당자, 관리자, 감독관
  private readonly LEVELS = 3;

  // 10명의 담당자와 4명의 관리자, 2명의 감독관으로 초기화한다.
  private readonly NUM_RESPONDENTS = 10;
  private readonly NUM_MANAGERS = 4;
  private readonly NUM_DIRECTORS = 2;

  /**
   * 직급별 직원 리스트
   * employeeLevels[0] = 고객 응대 담당자(respondents) 리스트
   * employeeLevels[1] = 관리자(managers) 리스트
   * employeeLevels[2] = 감독관(directors) 리스트
   */
  private employeeLevels: Employee[][];

  // 직급별 수신 전화 대기 큐
  private callQueues: Call[][];

  constructor() {
    this.employeeLevels = [];
    this.callQueues = [];
  }

  getHandlerForCall(call: Call): Employee | null {
    for (let level = call.getRank(); level < this.LEVELS - 1; level++) {
      const employeeLevel = this.employeeLevels[level];
      for (const employee of employeeLevel) {
        if (employee.isFree()) {
          return employee;
        }
      }
    }
    return null;
  }

  dispatchCallWrapper(caller: Caller) {
    const call = new Call(caller);
    this.dispatchCall(call);
  }

  dispatchCall(call: Call) {
    const emp = this.getHandlerForCall(call);
    if (emp !== null) {
      emp.receiveCall(call);
      call.setHandler(emp);
    } else {
      call.reply('Please wait for free employee to reply');
      this.callQueues[call.getRank()].push(call);
    }
  }

  assignCall(emp: Employee) {}
}
