CALC.createNameSpace('CALC.isp.before.AddOperation');

CALC.isp.before.AddOperation = (function () {
  var AbstractOperation = CALC.isp.before.AbstractOperation;

  var AddOperation;

  AddOperation = function () {
    AbstractOperation.call(this);
  };

  AddOperation.prototype = Object.create(AbstractOperation.prototype, {
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

  AddOperation.prototype.getOperator = function () {
    return '+';
  };

  AddOperation.prototype.toString = function () {
    return 'AddOperation';
  };

  return AddOperation;
})();
