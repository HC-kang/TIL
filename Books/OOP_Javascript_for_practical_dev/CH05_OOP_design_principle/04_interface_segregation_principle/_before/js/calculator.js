CALC.createNameSpace('CALC.isp.before.Calculator');

CALC.isp.before.Calculator = (function () {
  var Calculator;

  Calculator = function () {
    this.operation = null;
  };

  Calculator.prototype.calculate = function (firstNumber, secondNumber) {
    var answer = this.operation.operate(firstNumber, secondNumber);

    return answer;
  };

  Calculator.prototype.setOperation = function (operation) {
    this.operation = operation;
  };

  Calculator.prototype.newDisplay = function (
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
