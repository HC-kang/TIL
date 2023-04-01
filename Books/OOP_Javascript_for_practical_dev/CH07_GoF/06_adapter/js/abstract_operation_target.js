CALC.createNameSpace('CALC.adapter.AbstractOperationTarget');

CALC.adapter.AbstractOperationTarget = (function () {
  var AbstractOperationTarget;

  AbstractOperationTarget = function () {};

  AbstractOperationTarget.prototype.operate = function (
    firstNumber,
    secondNumber
  ) {
    throw new Error('You have to implement the method do Something!');
  };

  AbstractOperationTarget.prototype.toString = function () {
    return 'AbstractOperationTarget';
  };

  return AbstractOperationTarget;
})();
