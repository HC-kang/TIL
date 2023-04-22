CALC.createNameSpace('CALC.sip.after.Calculator');

CALC.sip.after.Calculator = (function () {
  var Calculator;

  Calculator = function () {
    this.addOperation = null;
    this.subtractOperation = null;
    this.multiplyOperation = null;
    this.divideOperation = null;
  };

  Calculator.prototype.calculate = function (
    operator,
    firstNumber,
    secondNumber
  ) {
    var answer = 0;

    if (operator === '+') {
      answer = this.addOperation.add(firstNumber, secondNumber);
    } else if (operator === '-') {
      answer = this.subtractOperation.subtract(firstNumber, secondNumber);
    } else if (operator === '*') {
      answer = this.multiplyOperation.multiply(firstNumber, secondNumber);
    } else if (operator === '/') {
      answer = this.divideOperation.divide(firstNumber, secondNumber);
    }

    return answer;
  };

  Calculator.prototype.setAddOperation = function (addOperation) {
    this.addOperation = addOperation;
  };

  Calculator.prototype.setSubtractOperation = function (subtractOperation) {
    this.subtractOperation = subtractOperation;
  };

  Calculator.prototype.setMultiplyOperation = function (multiplyOperation) {
    this.multiplyOperation = multiplyOperation;
  };

  Calculator.prototype.setDivideOperation = function (divideOperation) {
    this.divideOperation = divideOperation;
  };

  Calculator.prototype.toString = function () {
    return 'Calculator';
  };

  return Calculator;
})();
