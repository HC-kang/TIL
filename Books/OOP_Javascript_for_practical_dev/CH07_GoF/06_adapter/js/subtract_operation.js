CALC.createNameSpace('CALC.adapter.SubtractOperation');

CALC.adapter.SubtractOperation = (function () {
  var AbstractOperationTarget = CALC.adapter.AbstractOperationTarget;

  var SubtractOperation;

  SubtractOperation = function () {
    AbstractOperationTarget.call(this);
  };

  SubtractOperation.prototype = Object.create(
    AbstractOperationTarget.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: SubtractOperation,
      },
    }
  );

  SubtractOperation.prototype.operate = function (firstNumber, secondNumber) {
    return firstNumber - secondNumber;
  };

  SubtractOperation.prototype.toString = function () {
    return 'SubtractOperation';
  };

  return SubtractOperation;
})();
