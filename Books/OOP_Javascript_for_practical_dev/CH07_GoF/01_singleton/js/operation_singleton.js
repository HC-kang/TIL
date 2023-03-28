// 전역공간 내 변수의 충돌을 방지하기 위한 namespace 생성
CALC.createNameSpace('CALC.singleton.OperationSingleton');

// 즉시실행 함수를 통한 OperationSingleton 객체 생성
CALC.singleton.OperationSingleton = (function () {
  var OperationSingleton;

  OperationSingleton = function () {
    if (OperationSingleton._instance) {
      return OperationSingleton._instance;
    }

    OperationSingleton._instance = this;
  };

  // OperationSingleton 객체에 operate 메서드 추가
  OperationSingleton.getInstance = function () {
    if (!OperationSingleton._instance) {
      OperationSingleton._instance = new OperationSingleton();
    }

    return OperationSingleton._instance;
  };

  OperationSingleton.ADD_OPERATION = 1;
  OperationSingleton.SUBTRACT_OPERATION = 2;
  OperationSingleton.MULTIPLY_OPERATION = 3;
  OperationSingleton.DIVIDE_OPERATION = 4;

  // OperationSingleton 객체의 프로토타입에 operate 메서드 추가
  OperationSingleton.prototype.operate = function (
    operatorType,
    firstNumber,
    secondNumber
  ) {
    var answer = 0;
    var operator = null;

    switch (operatorType) {
      case OperationSingleton.ADD_OPERATION:
        answer = firstNumber + secondNumber;
        operator = '+';
        break;
      case OperationSingleton.SUBTRACT_OPERATION:
        answer = firstNumber - secondNumber;
        operator = '-';
        break;
      case OperationSingleton.MULTIPLY_OPERATION:
        answer = firstNumber * secondNumber;
        operator = '*';
        break;
      case OperationSingleton.DIVIDE_OPERATION:
        answer = firstNumber / secondNumber;
        operator = '/';
        break;
    }

    var result = firstNumber + operator + secondNumber + '=' + answer;

    this.print(result);
  };

  OperationSingleton.prototype.print = function (result) {
    console.log(result);
  };

  OperationSingleton.prototype.toString = function () {
    return 'OperationSingleton';
  };

  return OperationSingleton;
})();
