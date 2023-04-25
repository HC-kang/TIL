CALC.createNameSpace('CALC.lsp.after.AbstractOperation');

CALC.lsp.after.AbstractOperation = (function () {
  var AbstractOperation;

  AbstractOperation = function () {};

  AbstractOperation.prototype.operate = function (firstNumber, secondNumber) {
    throw new Error('You have to implement the method operate()');
  };

  AbstractOperation.prototype.isInvalidNumber = function (
    firstNumber,
    secondNumber
  ) {
    return false;
  };

  AbstractOperation.prototype.toString = function () {
    return 'AbstractOperation';
  };

  return AbstractOperation;
})();
