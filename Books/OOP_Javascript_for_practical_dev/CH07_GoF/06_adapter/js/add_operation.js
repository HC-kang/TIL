CALC.createNameSpace('CALC.adapter.AddOperation');

CALC.adapter.AddOperation = (function () {
  var AbstractOperationTarget = CALC.adapter.AbstractOperationTarget;

  var AddOperation;

  AddOperation = function () {
    AbstractOperationTarget.call(this);
  };

  AddOperation.prototype = Object.create(AbstractOperationTarget.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: AddOperation,
    },
  });

  AddOperation.prototype.operate = function (firstNumber, secondNumber) {
    return firstNumber + secondNumber;
  };

  AddOperation.prototype.toString = function () {
    return 'AddOperation';
  };

  return AddOperation;
})();
