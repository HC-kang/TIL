CALC.createNameSpace('CALC.strategy.AbstractOperationStrategy');

CALC.strategy.AbstractOperationStrategy = (function () {
  var AbstractOperationStrategy;

  AbstractOperationStrategy = function () {};

  AbstractOperationStrategy.prototype.getAnswer = function (
    firstNumber,
    secondNumber
  ) {
    throw new Error('You have to implement the method getAnswer!');
  };

  AbstractOperationStrategy.prototype.getOperator = function () {
    throw new Error('You have to implement the method getOperator!');
  };

  AbstractOperationStrategy.prototype.toString = function () {
    return 'AbstractOperationStrategy';
  };

  return AbstractOperationStrategy;
})();
