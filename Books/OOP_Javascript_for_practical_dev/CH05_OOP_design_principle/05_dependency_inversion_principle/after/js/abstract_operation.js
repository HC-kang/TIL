CALC.createNameSpace('CALC.dip.after.AbstractOperation');

CALC.dip.after.AbstractOperation = (function () {
  var AbstractOperation;

  AbstractOperation = function () {};

  AbstractOperation.prototype.operate = function (firstNumber, secondNumber) {
    throw new Error('You have to implement the method operate!');
  };

  AbstractOperation.prototype.toString = function () {
    throw new Error('You have to implement the method toString!');
  };

  return AbstractOperation;
})();
