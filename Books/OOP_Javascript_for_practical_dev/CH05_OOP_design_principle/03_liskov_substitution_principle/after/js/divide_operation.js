CALC.createNameSpace('CALC.lsp.after.DivideOperation');

CALC.lsp.after.DivideOperation = (function () {
  var AbstractOperation = CALC.lsp.after.AbstractOperation;

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

  DivideOperation.prototype.operate = function (firstNumber, secondNumber) {
    return firstNumber / secondNumber;
  };

  DivideOperation.prototype.isInvalidNumber = function (
    firstNumber,
    secondNumber
  ) {
    if (secondNumber === 0) {
      return true;
    }

    return false;
  };

  DivideOperation.prototype.toString = function () {
    return 'DivideOperation';
  };

  return DivideOperation;
})();
