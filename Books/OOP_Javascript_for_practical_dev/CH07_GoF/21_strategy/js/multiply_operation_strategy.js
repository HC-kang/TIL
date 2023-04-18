CALC.createNameSpace('CALC.strategy.MultiplyOperationStrategy');

CALC.strategy.MultiplyOperationStrategy = (function () {
  var AbstractOperationStrategy = CALC.strategy.AbstractOperationStrategy;

  var MultiplyOperationStrategy;

  MultiplyOperationStrategy = function () {
    AbstractOperationStrategy.call(this);
  };

  MultiplyOperationStrategy.prototype = Object.create(
    AbstractOperationStrategy.prototype,
    {
      constructor: {
        configurable: true,
        enumerable: false,
        writable: true,
        value: MultiplyOperationStrategy,
      },
    }
  );

  MultiplyOperationStrategy.prototype.getAnswer = function (
    firstNumber,
    secondNumber
  ) {
    return firstNumber * secondNumber;
  };

  MultiplyOperationStrategy.prototype.getOperator = function () {
    return ' * ';
  };

  MultiplyOperationStrategy.prototype.toString = function () {
    return 'MultiplyOperationStrategy';
  };

  return MultiplyOperationStrategy;
})();
