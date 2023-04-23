CALC.createNameSpace('CALC.ocp.after.MultiplyOperation');

CALC.ocp.after.MultiplyOperation = (function () {
  var AbstractOperation = CALC.ocp.after.AbstractOperation;

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

  MultiplyOperation.prototype.toString = function () {
    return 'MultiplyOperation';
  };

  return MultiplyOperation;
})();
