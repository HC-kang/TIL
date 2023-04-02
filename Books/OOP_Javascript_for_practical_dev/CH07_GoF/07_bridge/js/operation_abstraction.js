CALC.createNameSpace('CALC.bridge.OperationAbstraction');

CALC.bridge.OperationAbstraction = (function () {
  var OperationAbstraction;

  OperationAbstraction = function (impl) {
    this.impl = impl;
  };

  OperationAbstraction.prototype.add = function (firstNumber, secondNumber) {
    return this.impl.add(firstNumber, secondNumber);
  };

  OperationAbstraction.prototype.subtract = function (
    firstNumber,
    secondNumber
  ) {
    return this.impl.subtract(firstNumber, secondNumber);
  };

  OperationAbstraction.prototype.multiply = function (
    firstNumber,
    secondNumber
  ) {
    return this.impl.multiply(firstNumber, secondNumber);
  };

  OperationAbstraction.prototype.divide = function (firstNumber, secondNumber) {
    return this.impl.divide(firstNumber, secondNumber);
  };

  OperationAbstraction.prototype.toString = function () {
    return 'OperationAbstraction';
  };

  return OperationAbstraction;
})();
