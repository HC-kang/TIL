CALC.createNameSpace('CALC.isp.after.Calculator');

CALC.isp.after.Calculator = (function () {
  var IDisplayable = CALC.isp.after.IDisplayable;

  var Calculator;

  Calculator = function () {
    this.operation = null;
  };

  Calculator.prototype = Object.create(IDisplayable.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: Calculator,
    },
  });

  Calculator.prototype.calculate = function (firstNumber, secondNumber) {
    var answer = this.operation.operate(firstNumber, secondNumber);

    return answer;
  };

  Calculator.prototype.setOperation = function (operation) {
    this.operation = operation;
  };

  Calculator.prototype.display = function (
    operation,
    firstNumber,
    secondNumber
  ) {
    var answer = operation.operate(firstNumber, secondNumber);

    var operator = operation.getOperator();

    console.log(
      firstNumber + ' ' + operator + ' ' + secondNumber + ' = ' + answer
    );
  };

  Calculator.prototype.toString = function () {
    return 'Calculator';
  };

  return Calculator;
})();
