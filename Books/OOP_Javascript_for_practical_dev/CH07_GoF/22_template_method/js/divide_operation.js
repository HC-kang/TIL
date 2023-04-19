CALC.createNameSpace('CALC.templatemethod.DivideOperation');

CALC.templatemethod.DivideOperation = (function () {
  var AbstractOperation = CALC.templatemethod.AbstractOperation;

  var DivideOperation;

  DivideOperation = function () {
    AbstractOperation.call(this);
  };

  DivideOperation.prototype = Object.create(AbstractOperation.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: DivideOperation,
    },
  });

  DivideOperation.prototype.getAnswer = function (firstNumber, secondNumber) {
    return firstNumber / secondNumber;
  };

  DivideOperation.prototype.getOperator = function () {
    return '/';
  };

  DivideOperation.prototype.toString = function () {
    return 'DivideOperation';
  };

  return DivideOperation;
})();
