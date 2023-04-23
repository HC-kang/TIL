CALC.createNameSpace('CALC.ocp.before.Calculator');

CALC.ocp.before.Calculator = (function () {
  var Calculator;

  Calculator = function () {
    this.addOperation = null;
    this.subtractOperation = null;
    this.multiplyOperation = null;
  };

  Calculator.prototype.add = function (firstNumber, secondNumber) {
    var answer = this.addOperation.operate(firstNumber, secondNumber);

    return answer;
  };

  Calculator.prototype.subtract = function (firstNumber, secondNumber) {
    var answer = this.subtractOperation.operate(firstNumber, secondNumber);

    return answer;
  };

  Calculator.prototype.multiply = function (firstNumber, secondNumber) {
    var answer = this.multiplyOperation.operate(firstNumber, secondNumber);

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

  Calculator.prototype.toString = function () {
    return 'Calculator';
  };

  return Calculator;
})();
