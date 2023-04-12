CALC.createNameSpace('CALC.iterator.AbstractOperation');

CALC.iterator.AbstractOperation = (function () {
  var AbstractOperation;

  AbstractOperation = function () {};

  AbstractOperation.prototype.getAnswer = function (firstNumber, secondNumber) {
    throw new Error('You have to implement the method getAnswer()!');
  };

  AbstractOperation.prototype.print = function (firstNumber, secondNumber) {
    throw new Error('You have to implement the method print()!');
  };

  AbstractOperation.prototype.toString = function () {
    return 'AbstractOperation';
  };

  return AbstractOperation;
})();
