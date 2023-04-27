CALC.createNameSpace('CALC.dip.after.Calculator');

CALC.dip.after.Calculator = (function () {
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

  Calculator.prototype.toString = function () {
    return 'Calculator';
  };

  return Calculator;
})();
