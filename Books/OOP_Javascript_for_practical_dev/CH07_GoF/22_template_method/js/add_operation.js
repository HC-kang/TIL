CALC.createNameSpace('CALC.templatemethod.AddOperation');

CALC.templatemethod.AddOperation = (function () {
  var AbstractOperation = CALC.templatemethod.AbstractOperation;

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

  AddOperation.prototype.getAnswer = function (firstNumber, secondNumber) {
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
