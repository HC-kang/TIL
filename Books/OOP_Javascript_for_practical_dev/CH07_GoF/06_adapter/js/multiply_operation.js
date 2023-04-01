CALC.createNameSpace('CALC.adapter.MultiplyOperation');

CALC.adapter.MultiplyOperation = (function () {
  var AbstractOperationTarget = CALC.adapter.AbstractOperationTarget;

  var MultiplyOperation;

  MultiplyOperation = function () {
    AbstractOperationTarget.call(this);
  };

  MultiplyOperation.prototype = Object.create(
    AbstractOperationTarget.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: MultiplyOperation,
      },
    }
  );

  MultiplyOperation.prototype.operate = function (firstNumber, secondNumber) {
    return firstNumber * secondNumber;
  };

  MultiplyOperation.prototype.toString = function () {
    return 'MultiplyOperation';
  };

  return MultiplyOperation;
})();
