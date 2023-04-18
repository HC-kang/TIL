CALC.createNameSpace('CALC.strategy.SubtractOperationStrategy');

CALC.strategy.SubtractOperationStrategy = (function () {
  var AbstractOperationStrategy = CALC.strategy.AbstractOperationStrategy;

  var SubtractOperationStrategy;

  SubtractOperationStrategy = function () {
    AbstractOperationStrategy.call(this);
  };

  SubtractOperationStrategy.prototype = Object.create(
    AbstractOperationStrategy.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: SubtractOperationStrategy,
      },
    }
  );

  SubtractOperationStrategy.prototype.getAnswer = function (
    firstNumber,
    secondNumber
  ) {
    return firstNumber - secondNumber;
  };

  SubtractOperationStrategy.prototype.getOperator = function () {
    return ' - ';
  };

  SubtractOperationStrategy.prototype.toString = function () {
    return 'SubtractOperationStrategy';
  };

  return SubtractOperationStrategy;
})();
