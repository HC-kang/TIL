CALC.createNameSpace('CALC.ocp.after.AddOperation');

CALC.ocp.after.AddOperation = (function () {
  var AbstractOperation = CALC.ocp.after.AbstractOperation;

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

  AddOperation.prototype.toString = function () {
    return 'AddOperation';
  };

  return AddOperation;
})();
