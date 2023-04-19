CALC.createNameSpace('CALC.templatemethod.MultiplyOperation');

CALC.templatemethod.MultiplyOperation = (function () {
  var AbstractOperation = CALC.templatemethod.AbstractOperation;

  var MultiplyOperation;

  MultiplyOperation = function () {
    AbstractOperation.call(this);
  };

  MultiplyOperation.prototype = Object.create(AbstractOperation.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: MultiplyOperation,
    },
  });

  MultiplyOperation.prototype.getAnswer = function (firstNumber, secondNumber) {
    return firstNumber * secondNumber;
  };

  MultiplyOperation.prototype.getOperator = function () {
    return '*';
  };

  MultiplyOperation.prototype.toString = function () {
    return 'MultiplyOperation';
  };

  return MultiplyOperation;
})();
