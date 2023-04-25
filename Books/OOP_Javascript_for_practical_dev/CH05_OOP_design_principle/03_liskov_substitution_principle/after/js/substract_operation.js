CALC.createNameSpace('CALC.lsp.after.SubtractOperation');

CALC.lsp.after.SubtractOperation = (function () {
  var AbstractOperation = CALC.lsp.after.AbstractOperation;

  var SubtractOperation;

  SubtractOperation = function () {
    AbstractOperation.call(this);
  };

  SubtractOperation.prototype = Object.create(AbstractOperation.prototype, {
    constructor: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: SubtractOperation,
    },
  });

  SubtractOperation.prototype.operate = function (firstNumber, secondNumber) {
    return firstNumber - secondNumber;
  };

  SubtractOperation.prototype.toString = function () {
    return 'SubtractOperation';
  };

  return SubtractOperation;
})();
