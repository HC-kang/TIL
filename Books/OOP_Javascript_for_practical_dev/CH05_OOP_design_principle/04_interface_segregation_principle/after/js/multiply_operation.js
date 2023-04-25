CALC.createNameSpace('CALC.isp.after.MultiplyOperation');

CALC.isp.after.MultiplyOperation = (function () {
  var AbstractOperation = CALC.isp.after.AbstractOperation;

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

  MultiplyOperation.prototype.operate = function (firstNumber, secondNumber) {
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
