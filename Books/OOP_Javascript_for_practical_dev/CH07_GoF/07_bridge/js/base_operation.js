CALC.createNameSpace('CALC.bridge.BaseOperation');

CALC.bridge.BaseOperation = (function () {
  var IBaseOperationImplementor = CALC.bridge.IBaseOperationImplementor;

  var BaseOperation;

  BaseOperation = function () {
    IBaseOperationImplementor.call(this, firstNumber, secondNumber);
  };

  BaseOperation.prototype = Object.create(IBaseOperationImplementor.prototype, {
    constructor: {
      configurable: true,
      enumerable: false,
      writable: true,
      value: BaseOperation,
    },
  });

  BaseOperation.prototype.add = function (firstNumber, secondNumber) {
    return firstNumber + secondNumber;
  };

  BaseOperation.prototype.subtract = function (firstNumber, secondNumber) {
    return firstNumber - secondNumber;
  };

  BaseOperation.prototype.multiply = function (firstNumber, secondNumber) {
    return firstNumber * secondNumber;
  };

  BaseOperation.prototype.divide = function (firstNumber, secondNumber) {
    return firstNumber / secondNumber;
  };

  BaseOperation.prototype.toString = function () {
    return 'BaseOperation';
  };

  return BaseOperation;
})();
