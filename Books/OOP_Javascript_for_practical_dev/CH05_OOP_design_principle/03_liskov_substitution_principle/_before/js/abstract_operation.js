CALC.createNameSpace('CALC.lsp.before.AbstractOperation');

CALC.lsp.before.AbstractOperation = (function () {
  var AbstractOperation;

  AbstractOperation = function () {};

  AbstractOperation.prototype.operate = function (firstNumber, secondNumber) {
    throw new Error('You have to implement the method doSomething!');
  };

  AbstractOperation.prototype.toString = function () {
    return 'AbstractOperation';
  };

  return AbstractOperation;
})();
