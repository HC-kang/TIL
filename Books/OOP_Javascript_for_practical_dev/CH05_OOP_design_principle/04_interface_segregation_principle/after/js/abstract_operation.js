CALC.createNameSpace('CALC.isp.after.AbstractOperation');

CALC.isp.after.AbstractOperation = (function () {
  var AbstractOperation;

  AbstractOperation = function () {};

  AbstractOperation.prototype.operate = function (firstNumber, secondNumber) {
    throw new Error('You have to implement the method operate!');
  };

  AbstractOperation.prototype.getOperator = function () {
    throw new Error('You have to implement the method getOperator!');
  };

  AbstractOperation.prototype.toString = function () {
    return 'AbstractOperation';
  };

  return AbstractOperation;
})();
