CALC.createNameSpace('CALC.ocp.after.AbstractOperation');

CALC.ocp.after.AbstractOperation = (function () {
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
